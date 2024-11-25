'use client'

import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { accessTokenState, authState, selectedChatRoomIdState, selectedChatHistoryState, chatRoomsState } from '@/context/recoil-context';
import { GetChatLocation, GetChatList, SendMessage } from '@/lib/action';
import { Message as AuroraMessage } from '@/lib/types';
import ChatModal from './ChatModal';
import ChatRouteNoteModal from './ChatRouteNoteModal';
import ChatDeleteModal from './ChatDeleteModal';

export default function ChatInput() {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const isAuth = useRecoilValue(authState);
    const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState);
    const setSelectedChatRoomId = useSetRecoilState(selectedChatRoomIdState);
    const setChatHistory = useSetRecoilState(selectedChatHistoryState);
    const [chatRooms, setChatRooms] = useRecoilState(chatRoomsState); // 현재 채팅방 리스트 상태
    const [inputValue, setInputValue] = useState<string>('');
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [isChatDeleteModalOpen, setIsChatDeleteModalOpen] = useState(false);
    const [isChatRouteNoteModalOpen, setIsChatRouteNoteModalOpen] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const isSendingRef = useRef<boolean>(false);

    const currentChatRoom = chatRooms.find((room) => room.chatRoomId === selectedChatRoomId);

    const userMessage: AuroraMessage = {
        contents: inputValue,
        senderType: 'MEMBER',
        createdAt: new Date().toISOString(),
    };

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        autoResizeTextarea();
    };

    const autoResizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const createChatRoomAndSendMessage = async () => {
        if (!isAuth) {
            alert('로그인 이후에 채팅을 이용할 수 있습니다.');
            return;
        }

        if (inputValue.trim() === '' || isSendingRef.current) return;

        isSendingRef.current = true;

        let currentChatRoomId = selectedChatRoomId;
        const userMessage: AuroraMessage = {
            contents: inputValue,
            senderType: 'MEMBER',
            createdAt: new Date().toISOString(),
        };

        if (!currentChatRoomId) {
            // 새로운 채팅방 생성 요청
            const location = await GetChatLocation(accessToken);
            if (location) {
                currentChatRoomId = parseInt(location.split('/').pop()!);

                // `selectedChatRoomId`가 업데이트될 때까지 기다림
                await new Promise<void>((resolve) => {
                    setSelectedChatRoomId(currentChatRoomId);
                    setTimeout(resolve, 100);  // 약간의 지연을 추가하여 `setSelectedChatRoomId`가 완료되도록 함
                });

                // 새로운 채팅방을 가져와 업데이트
                const chatRoomsResponse = await GetChatList(accessToken);
                setChatRooms(chatRoomsResponse);
            }
        }

        // 사용자 메시지 추가
        setChatHistory((prev) => [...prev, userMessage]);

        // AI 응답 처리
        if (currentChatRoomId) {
            try {
                const messageData = await SendMessage(accessToken, currentChatRoomId.toString(), inputValue);
                
                // 빈 AI 메시지 먼저 추가
                const aiMessage: AuroraMessage = {
                    contents: '',
                    senderType: 'AURORA_AI',
                    createdAt: new Date().toISOString(),
                    isTyping: true
                };
                setChatHistory((prev) => [...prev, aiMessage]);

                // 타이핑 효과로 메시지 표시
                let currentIndex = 0;
                return new Promise<void>((resolve) => {
                    const interval = setInterval(() => {
                        if (currentIndex <= messageData.responseMessage.length) {
                            setChatHistory(prev => {
                                const newHistory = [...prev];
                                const lastMessage = {
                                    ...newHistory[newHistory.length - 1],
                                    contents: messageData.responseMessage.slice(0, currentIndex),
                                    isTyping: true
                                };
                                return [...newHistory.slice(0, -1), lastMessage];
                            });
                            currentIndex++;
                        } else {
                            clearInterval(interval);
                            setChatHistory(prev => {
                                const newHistory = [...prev];
                                const lastMessage = {
                                    ...newHistory[newHistory.length - 1],
                                    contents: messageData.responseMessage,
                                    isTyping: false
                                };
                                return [...newHistory.slice(0, -1), lastMessage];
                            });
                            resolve();
                        }
                    }, 50);
                });
            } finally {
                updateChatRooms();
                isSendingRef.current = false;
                setInputValue('');
            }
        }
    };

    const updateChatRooms = async () => {
        const newRooms = await GetChatList(accessToken);
        setChatRooms(newRooms);
    };

    const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            setInputValue('');
            await createChatRoomAndSendMessage();
        }
    };

    return (
        <div className="bg-white p-4 border-t border-gray-200">
            {currentChatRoom?.isSummarized ? (
                <div className="flex items-end gap-[0.75rem] w-full max-w-7xl mx-auto relative">
                    <button 
                        onClick={() => setIsChatDeleteModalOpen(true)}
                        disabled={!selectedChatRoomId}
                        className={`flex justify-center items-center px-4 py-2 rounded-[1rem] border transition-colors sm:w-auto ${
                            selectedChatRoomId 
                                ? 'border-[#776BFF] text-[#776BFF] hover:bg-[#F9F8FF]' 
                                : 'border-gray-300 text-gray-300 cursor-not-allowed'
                        }`}
                        style={{ height: '3.2rem' }}
                    >
                        <span className="hidden sm:inline">삭제하기</span>
                        <svg 
                            className="w-6 h-6 sm:hidden"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                            />
                        </svg>
                    </button>

                    <div className="flex-grow flex items-center justify-center px-[1.5rem] rounded-[1rem] border border-[#AEA0FF] bg-white"
                         style={{ height: '3.2rem' }}>
                        <span className="text-[0.875rem] sm:text-[1rem] text-[#6A6F7A]">요약이 완료된 채팅입니다</span>
                    </div>

                    <button
                        onClick={() => setIsChatRouteNoteModalOpen(true)}
                        className="flex justify-center items-center gap-[0.625rem] rounded-[1rem] bg-[#776BFF] text-white font-semibold transition duration-300 ease-in-out hover:bg-[#F9F8FF] hover:text-[#776BFF]"
                        style={{ height: '3.2rem', padding: '0.5rem 1.5rem' }}
                    >
                        <span className="hidden sm:inline">요약으로 이동</span>
                        <svg 
                            className="w-6 h-6 sm:hidden"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M14 5l7 7m0 0l-7 7m7-7H3" 
                            />
                        </svg>
                    </button>
                </div>
            ) : (
                <div className="flex items-end gap-[0.75rem] w-full max-w-7xl mx-auto relative">
                    <button 
                        onClick={() => setIsChatDeleteModalOpen(true)}
                        disabled={!selectedChatRoomId}
                        className={`flex justify-center items-center px-4 py-2 rounded-[1rem] border transition-colors sm:w-auto ${
                            selectedChatRoomId 
                                ? 'border-[#776BFF] text-[#776BFF] hover:bg-[#F9F8FF]' 
                                : 'border-gray-300 text-gray-300 cursor-not-allowed'
                        }`}
                        style={{ height: '3.2rem' }}
                    >
                        <span className="hidden sm:inline">삭제하기</span>
                        <svg 
                            className="w-6 h-6 sm:hidden"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                            />
                        </svg>
                    </button>   

                    <div className="flex-grow flex items-center px-[1.5rem] py-[0.25rem] rounded-[1rem] border border-[#AEA0FF] bg-white relative">
                        <textarea 
                            ref={textareaRef} 
                            className="w-full text-[0.875rem] sm:text-[1rem] text-[#6A6F7A] font-medium leading-[1.5rem] resize-none outline-none overflow-hidden" 
                            placeholder="오로라와 얘기해보세요" 
                            value={inputValue} 
                            onInput={handleInput} 
                            onKeyDown={handleKeyDown} 
                            rows={1} 
                            style={{ minHeight: '1.5rem', maxHeight: '6rem', padding: '0.5rem 0' }} 
                        />
                        <button 
                            onClick={createChatRoomAndSendMessage} 
                            className="absolute right-[10px] bottom-[7px] w-[35px] h-[35px] cursor-pointer text-[#776BFF]"
                        >
                            <svg 
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                                />
                            </svg>
                        </button>
                    </div>

                    <button
                        onClick={() => setIsChatModalOpen(true)}
                        disabled={!selectedChatRoomId}
                        className={`flex justify-center items-center gap-[0.625rem] rounded-[1rem] transition duration-300 ease-in-out ${
                            selectedChatRoomId 
                                ? 'bg-[#776BFF] text-white hover:bg-[#F9F8FF] hover:text-[#776BFF]' 
                                : 'bg-gray-300 text-white cursor-not-allowed'
                        }`}
                        style={{ height: '3.2rem', padding: '0.5rem 1.5rem' }}
                    >
                        <span className="hidden sm:inline">대화 끝내기</span>
                        <svg 
                            className="w-6 h-6 sm:hidden"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M14 5l7 7m0 0l-7 7m7-7H3" 
                            />
                        </svg>
                    </button>
                </div>
            )}
            <ChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />
            <ChatDeleteModal isOpen={isChatDeleteModalOpen} onClose={() => setIsChatDeleteModalOpen(false)} />
            <ChatRouteNoteModal isOpen={isChatRouteNoteModalOpen} onClose={() => setIsChatRouteNoteModalOpen(false)} />
        </div>
    );
}
