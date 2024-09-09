'use client';

import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { accessTokenState, authState, selectedChatRoomIdState, selectedChatHistoryState, chatRoomsState } from '@/context/recoil-context';
import { GetChatLocation, GetChatList, SendMessage } from '@/lib/action';
import { Message as AuroraMessage } from '@/lib/types';
import { ChatRoom } from '@/lib/types';

export default function ChatInput() {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const isAuth = useRecoilValue(authState);
    const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState);
    const setSelectedChatRoomId = useSetRecoilState(selectedChatRoomIdState);
    const setChatHistory = useSetRecoilState(selectedChatHistoryState);
    const [inputValue, setInputValue] = useState<string>('');
    const [chatRooms, setChatRooms] = useRecoilState<ChatRoom[]>(chatRoomsState); // Use Recoil for chat rooms

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const isSendingRef = useRef<boolean>(false);

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
    
        // 채팅방이 없는 경우 새 채팅방 ID를 가져옵니다.
        if (!currentChatRoomId) {
            const location = await GetChatLocation(accessToken);
            if (location) {
                currentChatRoomId = parseInt(location.split('/').pop()!);
                setSelectedChatRoomId(currentChatRoomId);
            }
        }
    
        if (currentChatRoomId) {
            const userMessage: AuroraMessage = {
                contents: inputValue,
                senderType: 'MEMBER',
                createdAt: new Date().toISOString(),
            };
    
            setChatHistory(prev => [...prev, userMessage]);
    
            const response = await SendMessage(accessToken, currentChatRoomId.toString(), inputValue);
            if (response.ok) {
                const data = await response.json();
                const aiMessage: AuroraMessage = {
                    contents: data.responseMessage,
                    senderType: 'AURORA_AI',
                    createdAt: new Date().toISOString(),
                };
                setChatHistory(prev => [...prev, aiMessage]);
            } else {
                console.error('Failed to send message:', response.statusText);
            }
        }
    
        // 채팅방 목록을 새로 가져옵니다.
        const newRooms = await GetChatList(accessToken);
        if (newRooms) {
            setChatRooms(prevRooms => {
                // 중복을 제거하고 새 목록을 추가합니다.
                const mergedRooms = [...prevRooms, ...newRooms];
                return mergedRooms.reduce((acc, current) => {
                    const x = acc.find((item: ChatRoom) => item.chatRoomId === current.chatRoomId);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
            });
        }
    
        setInputValue('');
        isSendingRef.current = false;
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
                    className="flex h-[3.2rem] px-[1.5rem] py-[0.5rem] justify-center items-center gap-[0.625rem] rounded-[1rem] bg-[#007BFF] text-white font-semibold"
                >
                    전송
                </button>
            </div>
        </div>
    );
}
