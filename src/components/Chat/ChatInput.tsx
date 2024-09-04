'use client';

import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { GetChatLocation, SendMessage } from '@/lib/action';
import { Message } from '@/lib/types';
import { ClipLoader } from 'react-spinners';

interface ChatInputProps {
    chatRoomId: number | null;
    setChatRoomId: (id: number | null) => void;
    chatHistory: Message[];
    setChatHistory: React.Dispatch<React.SetStateAction<Message[]>>;
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        autoResizeTextarea();
    };

    const autoResizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleSendMessage = async () => {
        const trimmedMessage = inputValue.trim();
        if (!trimmedMessage || isLoading) return;

        setInputValue('');
        autoResizeTextarea();
        setIsLoading(true);

        try {
            let currentChatRoomId = chatRoomId;

            if (!currentChatRoomId) {
                const locationResponse = await GetChatLocation(accessToken);

                if (locationResponse && typeof locationResponse === 'object' && (locationResponse as Response).ok) {
                    const location = typeof locationResponse === 'string' ? locationResponse : (locationResponse as Response).headers.get('Location');

                    if (location) {
                        const id = parseInt(location.split('/').pop()!);
                        setChatRoomId(id);
                        currentChatRoomId = id;
                    } else {
                        throw new Error('Failed to retrieve chat room location.');
                    }
                } else {
                    throw new Error('Failed to create chat room.');
                }
            }

            const userMessage: Message = {
                contents: trimmedMessage,
                senderType: 'MEMBER',
                createdAt: new Date().toISOString(),
            };

            setChatHistory((prevMessages: Message[]) => [...prevMessages, userMessage]);

            const aiResponse = await SendMessage(accessToken, currentChatRoomId!.toString(), trimmedMessage);
            if (aiResponse.ok) {
                const data = await aiResponse.json();
                const aiMessage: Message = {
                    contents: data.responseMessage,
                    senderType: 'AURORA_AI',
                    createdAt: new Date().toISOString(),
                };
                setChatHistory((prevMessages: Message[]) => [...prevMessages, aiMessage]);
            } else {
                throw new Error('Failed to send message to AI.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleEndConversation = () => {
        setChatRoomId(null);
        setChatHistory([]);
        setInputValue('');
    };

    return (
        <div className="bg-white p-4 border-t border-gray-200">
            <div className="flex items-end gap-3 w-full max-w-3xl mx-auto">
                <div className="relative flex-grow">
                    <textarea
                        ref={textareaRef}
                        className="w-full max-h-36 min-h-[2.5rem] p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
                        placeholder="메시지를 입력하세요..."
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading || !accessToken}
                    />
                    {isLoading && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <ClipLoader size={20} color="#6366F1" />
                        </div>
                    )}
                </div>
                <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className={`px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 ${(isLoading || !inputValue.trim()) && 'opacity-50 cursor-not-allowed'}`}
                >
                    전송
                </button>
                <button
                    onClick={handleEndConversation}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-300"
                >
                    대화 끝내기
                </button>
            </div>
        </div>
    );
}
