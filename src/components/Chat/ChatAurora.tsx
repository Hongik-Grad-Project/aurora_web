import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChatRoom, Message as AuroraMessage } from '@/lib/types';
import { Dispatch, SetStateAction } from 'react';
import { floatingAnimation2 } from '@/lib/animations';
import ChatInput from './ChatInput';

interface ChatAuroraProps {
    chatRoom: ChatRoom | null;
    chatHistory: AuroraMessage[];
    setChatHistory: Dispatch<SetStateAction<AuroraMessage[]>>;
    accessToken: string;
    setChatRoomId: (id: number | null) => void;
    onCreateNewChatRoom: (message: string) => Promise<void>;
}

export default function ChatAurora({
    chatRoom,
    chatHistory,
    setChatHistory,
    accessToken,
    setChatRoomId,
    onCreateNewChatRoom,
}: ChatAuroraProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory]);

    return (
        <div className="flex flex-col w-full h-full bg-gray-100 relative pt-[70px]">
            <div className="flex-grow overflow-y-auto p-6 bg-white">
                {chatRoom ? (
                    <div className="space-y-4 w-full">
                        {chatHistory.map((message, index) => (
                            <div key={index} className={`relative p-4 rounded-lg ${message.senderType === 'AURORA_AI' ? 'bg-gray-200 text-gray-800 self-start mr-auto' : 'bg-indigo-500 text-white self-end ml-auto'}`} style={{ maxWidth: '75%', wordWrap: 'break-word', wordBreak: 'break-word', width: 'fit-content' }}>
                                {message.contents}
                                {/* SVG 말풍선 꼬리 */}
                                {message.senderType === 'MEMBER' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="absolute right-[-7px] bottom-[-2px]">
                                        <path d="M14.9999 14.9864C9.02761 12.3076 7.99843 5.71985 8.52749 1.21582L1.40771 11.4268C4.98573 13.1219 10.1923 15.1835 14.9999 14.9864Z" fill="#6366F1" stroke="#6366F1"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="absolute left-[-7px] bottom-[-2px]">
                                        <path d="M1.00011 14.9864C6.97239 12.3076 8.00157 5.71985 7.47251 1.21582L14.5923 11.4268C11.0143 13.1219 5.80766 15.1835 1.00011 14.9864Z" fill="#E5E7EB" stroke="#E5E7EB"/>
                                    </svg>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center w-full h-full">
                        <motion.div {...floatingAnimation2}>
                            <Image src="/assets/intro/section1_float_btn.png" alt="Aurora Logo" width={200} height={200} className="object-contain" />
                        </motion.div>
                        <div className="flex flex-col justify-center items-center mt-4">
                            <h2 className="text-3xl font-extrabold text-gray-800">Aurora Chat AI</h2>
                            <p className="text-gray-500 text-base mt-2">To Solve Social Problems</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
