'use client';

import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { GetChatLocation, SendMessage } from '@/lib/action';
import { Message as AuroraMessage } from '@/lib/types';

interface ChatInputProps {
    chatRoomId: number | null;
    setChatRoomId: (id: number | null) => void;
    chatHistory: AuroraMessage[];
    setChatHistory: React.Dispatch<React.SetStateAction<AuroraMessage[]>>;
    accessToken: string;
    onCreateNewChatRoom: (message: string) => Promise<void>; // Assuming it returns a promise
}


export default function ChatInput({
    chatRoomId,
    setChatRoomId,
    chatHistory,
    setChatHistory,
    accessToken,
}: ChatInputProps) {
    const [inputValue, setInputValue] = useState<string>('');
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
        if (inputValue.trim() === '' || isSendingRef.current) return;

        isSendingRef.current = true;
        let currentChatRoomId = chatRoomId;

        if (!currentChatRoomId) {
            // 새 채팅방 생성
            const location = await GetChatLocation(accessToken);
            if (location) {
                currentChatRoomId = parseInt(location.split('/').pop()!);
                setChatRoomId(currentChatRoomId);  // 새 채팅방 ID 설정
            }
        }

        // 메시지 전송 로직
        if (currentChatRoomId) {
            const userMessage: AuroraMessage = {
                contents: inputValue,
                senderType: 'MEMBER',
                createdAt: new Date().toISOString(),
            };
            setChatHistory(prev => [...prev, userMessage]); // 로컬 채팅 내역에 추가

            const response = await SendMessage(accessToken, currentChatRoomId.toString(), inputValue);
            if (response.ok) {
                const data = await response.json();
                const aiMessage: AuroraMessage = {
                    contents: data.responseMessage,
                    senderType: 'AURORA_AI',
                    createdAt: new Date().toISOString(),
                };
                setChatHistory(prev => [...prev, aiMessage]);  // AI 응답을 채팅 내역에 추가
            } else {
                console.error('Failed to send message:', response.statusText);
            }
        }

        setInputValue('');
        isSendingRef.current = false;
    };

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
