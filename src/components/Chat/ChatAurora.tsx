'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedChatRoomIdState, selectedChatHistoryState, chatRoomsState } from '@/context/recoil-context';
import { authState, accessTokenState } from '@/context/recoil-context';
import { floatingAnimation2 } from '@/lib/animations';
import { GetChatHistory } from '@/lib/action';

export default function ChatAurora() {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const isAuth = useRecoilValue(authState); // 로그인 여부 확인
    const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState); // 현재 선택된 채팅방 ID
    const chatHistory = useRecoilValue(selectedChatHistoryState); // 현재 채팅 내역
    const setChatHistory = useSetRecoilState(selectedChatHistoryState); // 채팅 내역 업데이트를 위한 setter
    const chatRooms = useRecoilValue(chatRoomsState); // 채팅방 목록
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 채팅 내역 불러오기
    useEffect(() => {
        fetchChatHistory();
    }, [selectedChatRoomId, accessToken, setChatHistory]);


    // 자동 스크롤
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory]);

    const currentChatRoom = chatRooms.find((room) => room.chatRoomId === selectedChatRoomId);

    useEffect(() => {
        if (selectedChatRoomId !== null) {
            const fetchChatHistory = async () => {
                try {
                    const response = await GetChatHistory(accessToken, selectedChatRoomId.toString());
                    if (response.ok) {
                        const historyData = await response.json();
                        setChatHistory(historyData);
                    } else {
                        console.error("Failed to fetch chat history:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching chat history:", error);
                }
            };
            fetchChatHistory();
        } else {
            setChatHistory([]);
        }
    }, [selectedChatRoomId, setChatHistory]);

    // 기존 채팅방 내역을 불러오는 함수
    const fetchChatHistory = async () => {
        if (accessToken && selectedChatRoomId !== null) {
            try {
                const chatHistoryResponse = await GetChatHistory(accessToken, selectedChatRoomId.toString());
                if (chatHistoryResponse.ok) {
                    const historyData = await chatHistoryResponse.json();
                    setChatHistory(historyData);
                }
            } catch (error) {
                console.error('Failed to fetch chat history:', error);
            }
        }
    };

    return (
        <>
            <div className="flex flex-col w-full h-full bg-gray-100 relative">
                <div className="flex-grow overflow-y-auto p-6 bg-white">
                    {currentChatRoom ? (
                        <div className="space-y-4 w-full">
                            {chatHistory.map((message, index) => (
                                <div
                                    key={index}
                                    className={`relative p-4 rounded-lg ${message.senderType === 'AURORA_AI'
                                        ? 'bg-gray-200 text-gray-800 self-start mr-auto'
                                        : 'bg-indigo-500 text-white self-end ml-auto'
                                        }`}
                                    style={{
                                        maxWidth: '75%',
                                        wordWrap: 'break-word',
                                        wordBreak: 'break-word',
                                        width: 'fit-content',
                                    }}
                                >
                                    {message.contents}
                                    {/* SVG 말풍선 꼬리 */}
                                    {message.senderType === 'MEMBER' ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            className="absolute right-[-7px] bottom-[-2px]"
                                        >
                                            <path
                                                d="M14.9999 14.9864C9.02761 12.3076 7.99843 5.71985 8.52749 1.21582L1.40771 11.4268C4.98573 13.1219 10.1923 15.1835 14.9999 14.9864Z"
                                                fill="#6366F1"
                                                stroke="#6366F1"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            className="absolute left-[-7px] bottom-[-2px]"
                                        >
                                            <path
                                                d="M1.00011 14.9864C6.97239 12.3076 8.00157 5.71985 7.47251 1.21582L14.5923 11.4268C11.0143 13.1219 5.80766 15.1835 1.00011 14.9864Z"
                                                fill="#E5E7EB"
                                                stroke="#E5E7EB"
                                            />
                                        </svg>
                                    )}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    ) : (
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
                            <div className="flex flex-col justify-center items-center mt-4">
                                <h2 className="text-3xl font-extrabold text-gray-800">Aurora Chat AI</h2>
                                <p className="text-gray-500 text-base mt-2">To Solve Social Problems</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
