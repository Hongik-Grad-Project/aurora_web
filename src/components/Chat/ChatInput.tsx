'use client';

import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { GetChatLocation, SendMessage } from '@/lib/action';
import { Message as AuroraMessage } from '@/lib/types'; // 동일하게 AuroraMessage로 타입 명시

interface ChatInputProps {
    chatRoomId: number | null;
    setChatRoomId: (id: number | null) => void;
    chatHistory: AuroraMessage[]; // lib/types에서 가져온 Message 타입을 사용
    setChatHistory: React.Dispatch<React.SetStateAction<AuroraMessage[]>>; // 정확한 타입 사용
    accessToken: string;
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
    const isSendingRef = useRef<boolean>(false); // 중복 전송 방지 플래그 설정

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

        // 사용자 메시지 구성
        const userMessage: AuroraMessage = {
            contents: inputValue,
            senderType: 'MEMBER',
            createdAt: new Date().toISOString(),
        };

        try {
            let currentChatRoomId = chatRoomId;

            if (!currentChatRoomId) {
                const location = await GetChatLocation(accessToken);
                if (location) {
                    const id = parseInt(location.split('/').pop()!); // Location에서 ID 추출
                    setChatRoomId(id);
                    currentChatRoomId = id;
                }
            }

            // 사용자 메시지를 채팅 내역에 추가
            setChatHistory((prevMessages) => [...prevMessages, userMessage]);

            // 서버로 메시지 전송 및 AI 응답 받기
            if (currentChatRoomId) {
                const response = await SendMessage(accessToken, currentChatRoomId.toString(), inputValue);
                if (response.ok) {
                    const data = await response.json();
                    const aiMessage: AuroraMessage = {
                        contents: data.responseMessage,
                        senderType: 'AURORA_AI',
                        createdAt: new Date().toISOString(),
                    };
                    setChatHistory((prevMessages) => [...prevMessages, aiMessage]);
                } else {
                    console.error('Failed to send message:', response.statusText);
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setInputValue('');
            isSendingRef.current = false;
        }
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
