'use client'

import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { GetChatLocation, SendMessage } from '@/lib/action';
import { accessTokenState } from '@/context/recoil-context';

interface Message {
    type: 'user' | 'ai';
    content: string;
}

interface ChatInputProps {
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    setChatLocation: React.Dispatch<React.SetStateAction<string | null>>; // Pass the setChatLocation function
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function ChatInput({ setMessages, setChatLocation, messagesEndRef }: ChatInputProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const [chatRoomId, setChatRoomId] = useState<number | null>(null);
    const accessToken = useRecoilValue(accessTokenState) || '';
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const isSendingRef = useRef<boolean>(false);  // To prevent double sending

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            await createChatRoomAndSendMessage();
        }
    };

    const createChatRoomAndSendMessage = async () => {
        if (inputValue.trim() === '' || isSendingRef.current) return;

        isSendingRef.current = true;  // Set the flag to prevent double sending

        const userMessage: Message = { type: 'user', content: inputValue };

        try {
            let currentChatRoomId = chatRoomId;

            if (!currentChatRoomId) {
                // Create a new chat room and get its location
                const location = await GetChatLocation(accessToken);
                if (location) {
                    const id = parseInt(location.split('/').pop()!); // Extract the chat room ID
                    setChatRoomId(id);
                    setChatLocation(location); // Update the chatLocation in the parent component
                    currentChatRoomId = id;
                }
            }

            // Send the user's message to the chat room
            if (currentChatRoomId) {
                // First, add the user's message to the chat
                setMessages((prevMessages) => [...prevMessages, userMessage]);

                const response = await SendMessage(accessToken, currentChatRoomId.toString(), inputValue);
                if (response.ok) {
                    const data = await response.json();
                    // Then, add the AI's response to the chat
                    setMessages((prevMessages) => [...prevMessages, { type: 'ai', content: data.responseMessage }]);
                } else {
                    console.error('Failed to send message:', response.statusText);
                }
            } else {
                console.error('Chat room ID is null or invalid.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }

        // Clear the input after sending the message
        setInputValue('');
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        isSendingRef.current = false;  // Reset the flag
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
                    대화 끝내기
                </button>
            </div>
        </div>
    );
}
