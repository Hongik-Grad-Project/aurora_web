'use client'

import { useEffect, useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '@/context/recoil-context';
import { GetChatLocation } from '@/lib/action';
import ChatInput from './ChatInput';

interface Message {
    type: 'user' | 'ai';
    content: string;
}

export default function ChatAurora() {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const [chatLocation, setChatLocation] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        { type: 'ai', content: 'Hello! How can I assist you today?' },
        { type: 'user', content: 'I want to know more about Aurora AI.' }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getChatLocation = async () => {
            try {
                const location = await GetChatLocation(accessToken);
                setChatLocation(location);
            } catch (error) {
                console.error('Failed to fetch chat location:', error);
            }
        };
        getChatLocation();
    }, [accessToken]);

    return (
        <div className="flex flex-col w-full h-screen bg-gray-100 relative">
            {/* Chat Messages Area */}
            <div className="flex-grow overflow-y-auto p-6 bg-white">
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg max-w-[75%] ${
                                message.type === 'ai'
                                    ? 'bg-blue-100 text-gray-800'
                                    : 'bg-gray-100 text-gray-800 self-end ml-auto'
                            }`}
                        >
                            {message.content}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Chat Input Area */}
            <div className="mt-auto w-full">
                {chatLocation && (
                    <div className="p-4 text-sm text-gray-600 bg-gray-50 text-center">
                        Chat location: {chatLocation}
                    </div>
                )}
                <ChatInput setMessages={setMessages} messagesEndRef={messagesEndRef} />
            </div>
        </div>
    );
}
