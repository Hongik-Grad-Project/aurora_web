'use client'

import { useEffect, useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '@/context/recoil-context';
import { motion } from 'framer-motion';
import ChatInput from './ChatInput';
import Image from 'next/image';
import { floatingAnimation2 } from '@/lib/animations';

interface Message {
    type: 'user' | 'ai';
    content: string;
}

export default function ChatAurora() {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const [chatLocation, setChatLocation] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatLocation) {
            // Scroll to the bottom when chat location is set or messages change
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [chatLocation, messages]);

    return (
        <div className="flex flex-col w-full h-full bg-gray-100 relative pt-[70px]"> {/* pt-[70px]로 상단 간격 유지 */}
            {/* Chat Messages Area */}
            <div className="flex-grow overflow-y-auto p-6 bg-white">
                {chatLocation ? (
                    <div className="space-y-4 w-full">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`relative p-4 rounded-lg ${
                                    message.type === 'ai'
                                        ? 'bg-gray-200 text-gray-800 self-start mr-auto'
                                        : 'bg-[#776BFF] text-white self-end ml-auto'
                                    }`}
                                style={{ 
                                    maxWidth: '75%', // 최대 가로 폭 설정
                                    wordWrap: 'break-word', 
                                    wordBreak: 'break-word',
                                    width: 'fit-content' // 내용에 따라 동적으로 길이 조정
                                }}
                            >
                                {message.content}
                                
                                {/* SVG 말풍선 꼬리 */}
                                {message.type === 'user' ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        className="absolute right-[-7px] bottom-[-2px]" // 위치를 더 아래로 조정
                                    >
                                        <path d="M14.9999 14.9864C9.02761 12.3076 7.99843 5.71985 8.52749 1.21582L1.40771 11.4268C4.98573 13.1219 10.1923 15.1835 14.9999 14.9864Z" fill="#776BFF" stroke="#776BFF"/>
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        className="absolute left-[-8px] bottom-[-2px]" // 위치를 더 아래로 조정
                                    >
                                        <path d="M1.00011 14.9864C6.97239 12.3076 8.00157 5.71985 7.47251 1.21582L14.5923 11.4268C11.0143 13.1219 5.80766 15.1835 1.00011 14.9864Z" fill="#E2E6EF" stroke="#E2E6EF"/>
                                    </svg>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                ) : (
                    // 로고 이미지 표시
                    <div className="flex flex-col justify-center items-center w-full h-full">
                        <motion.div {...floatingAnimation2}>
                            <Image
                                src="/assets/intro/section1_float_btn.png"
                                alt="Aurora Logo"
                                width={200}
                                height={200}
                                className="object-contain"
                            />
                        </motion.div>
                        <div className="flex flex-col justify-center items-center">
                            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 tracking-wide">
                                Aurora Chat AI
                            </h2>
                            <p className="text-gray-500 text-base mt-2">To Solve Social Problems</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Chat Input Area */}
            <div className="w-full">
                {chatLocation && (
                    <div className="p-4 text-sm text-gray-600 bg-gray-50 text-center">
                        Chat location: {chatLocation}
                    </div>
                )}
                <ChatInput setMessages={setMessages} setChatLocation={setChatLocation} messagesEndRef={messagesEndRef} />
            </div>
        </div>
    );
}
