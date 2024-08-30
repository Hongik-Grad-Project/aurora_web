'use client'

import { useState, useRef, ChangeEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '@/context/recoil-context';
import { SendMessage } from '@/lib/action';

interface Message {
    type: 'user' | 'ai';
    content: string;
}

interface ChatInputProps {
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function ChatInput({ setMessages, messagesEndRef }: ChatInputProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const chatRoomId = 1; // Assuming chatRoomId is 1, replace with actual ID as needed
    const accessToken = useRecoilValue(accessTokenState) || '';
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const sendMessage = async () => {
        if (inputValue.trim() === '') return;

        const newMessage: Message = { type: 'user', content: inputValue };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        try {
            const response = await SendMessage(accessToken, chatRoomId.toString(), inputValue);
            if (response.ok) {
                const data = await response.json();
                setMessages((prevMessages) => [...prevMessages, { type: 'ai', content: data.responseMessage }]);
            } else {
                console.error('Failed to send message:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }

        setInputValue('');
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white p-4 border-t border-gray-200 w-full flex justify-center">
            <div className="flex items-end gap-[0.75rem] w-full max-w-[42.6875rem] mx-auto">
                <div className="flex-grow flex items-center px-[1rem] py-[0.5rem] rounded-[1rem] border border-[#AEA0FF] bg-white">
                    <textarea
                        ref={textareaRef}
                        className="w-full text-[#6A6F7A] font-medium text-[1rem] leading-[1.5rem] resize-none outline-none overflow-hidden"
                        placeholder="메시지를 입력하세요..."
                        value={inputValue}
                        onInput={handleInput}
                        rows={1}
                        style={{ minHeight: '2rem', maxHeight: '8rem', padding: '0.5rem 0' }}
                    />
                </div>
                <button
                    onClick={sendMessage}
                    className="flex h-[3rem] px-[1.5rem] py-[0.75rem] justify-center items-center gap-[0.625rem] rounded-[1rem] bg-[#007BFF] text-white font-semibold"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
