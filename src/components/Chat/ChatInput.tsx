'use client';

import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { accessTokenState, authState, selectedChatRoomIdState, selectedChatHistoryState, chatRoomsState } from '@/context/recoil-context';
import { GetChatLocation, GetChatList, SendMessage } from '@/lib/action';
import { Message as AuroraMessage } from '@/lib/types';
import { set } from 'date-fns';

export default function ChatInput() {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const isAuth = useRecoilValue(authState);
    const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState);
    const setSelectedChatRoomId = useSetRecoilState(selectedChatRoomIdState);
    const setChatHistory = useSetRecoilState(selectedChatHistoryState);
    const [inputValue, setInputValue] = useState<string>('');
    const [chatRooms, setChatRooms] = useRecoilState(chatRoomsState); // Use Recoil for chat rooms

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const isSendingRef = useRef<boolean>(false);

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
        if (!currentChatRoomId) {
            const location = await GetChatLocation(accessToken);
            if (location) {
                currentChatRoomId = parseInt(location.split('/').pop()!);
                setSelectedChatRoomId(currentChatRoomId);
                const chatRoomsResponse = await GetChatList(accessToken);
                setChatRooms(chatRoomsResponse);
            }
        }
        
        setChatHistory(prev => [...prev, userMessage]);

        if (currentChatRoomId) {
            const response = await SendMessage(accessToken, currentChatRoomId.toString(), inputValue);
            if (response.ok) {
                const data = await response.json();
                const aiMessage: AuroraMessage = {
                    contents: data.responseMessage,
                    senderType: 'AURORA_AI',
                    createdAt: new Date().toISOString(),
                };
                // AI 응답을 채팅 내역에 추가
                setChatHistory(prev => [...prev, aiMessage]);
            } else {
                console.error('Failed to send message:', response.statusText);
            }
        }

        updateChatRooms();
        setInputValue('');
        isSendingRef.current = false;
    };

    const updateChatRooms = async () => {
        const newRooms = await GetChatList(accessToken);
        setChatRooms(newRooms);
    };

    // Enter 키 입력 시 메시지 전송
    const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            await createChatRoomAndSendMessage();
        }
    };

    return (
        <div className="bg-white p-4 border-t border-gray-200">
            <div className="flex items-end gap-[0.75rem] w-full max-w-[48rem] mx-auto">
                <div className="flex-grow flex items-center px-[1.5rem] py-[0.25rem] rounded-[1rem] border border-[#AEA0FF] bg-white">
                    <textarea
                        ref={textareaRef}
                        className="w-full text-[#6A6F7A] font-medium text-[1rem] leading-[1.5rem] resize-none outline-none overflow-hidden"
                        placeholder="메시지를 입력하세요..."
                        value={inputValue}
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        style={{ minHeight: '1.5rem', maxHeight: '6rem', padding: '0.5rem 0' }}
                    />
                </div>
                <button
                    onClick={createChatRoomAndSendMessage}
                    className="flex h-[3.2rem] px-[1.5rem] py-[0.5rem] justify-center items-center gap-[0.625rem] rounded-[1rem] bg-[#E2E6EF] text-[#4E525C] font-semibold"
                >
                    대화 끝내기
                </button>
            </div>
        </div>
    );
}
