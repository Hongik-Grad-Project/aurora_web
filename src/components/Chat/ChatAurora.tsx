'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedChatRoomIdState, selectedChatHistoryState, chatRoomsState } from '@/context/recoil-context';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ChatAurora() {
  const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState);
  const chatHistory = useRecoilValue(selectedChatHistoryState);
  const chatRooms = useRecoilValue(chatRoomsState);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChatRoom = chatRooms.find((room) => room.chatRoomId === selectedChatRoomId);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChatRoomId, chatHistory]);

  return (
    <div className="flex flex-col w-full h-full bg-gray-100 relative">
      <div className="flex-grow overflow-y-auto p-3 sm:p-6 bg-white mt-[52px] lg:mt-0">
        {currentChatRoom ? (
          <div className="space-y-3 w-full">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`relative p-3 sm:p-4 rounded-2xl text-sm sm:text-base ${message.senderType === 'AURORA_AI'
                  ? 'bg-gray-200 text-gray-800 self-start mr-auto'
                  : 'bg-indigo-500 text-white self-end ml-auto'
                  }`}
                style={{
                  maxWidth: '85%',
                  wordWrap: 'break-word',
                  wordBreak: 'break-word',
                  width: 'fit-content',
                }}
              >
                {message.contents}
                {message.senderType === 'MEMBER' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="absolute right-[-7px] bottom-[-1px]"
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
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
              <Image src="/assets/intro/section1_float_btn.png" alt="Aurora Logo" width={150} height={150} className="object-contain" />
            </motion.div>
            <div className="flex flex-col justify-center items-center mt-4">
              <h2 className="text-xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-300">어떤 문서가 필요한가요?</h2>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-4 mt-6 w-full max-w-[300px] sm:max-w-none px-4 sm:px-0">
                <button className="px-3 sm:px-6 py-2 bg-gray-50/80 border border-gray-200 rounded-full hover:bg-gray-100/90 transition-all">
                  <span className="text-[11px] sm:text-base">마케팅 기획서</span>
                </button>
                <button className="px-3 sm:px-6 py-2 bg-gray-50/80 border border-gray-200 rounded-full hover:bg-gray-100/90 transition-all">
                  <span className="text-[11px] sm:text-base">사업 계획서</span>
                </button>
                <button className="px-3 sm:px-6 py-2 bg-gray-50/80 border border-gray-200 rounded-full hover:bg-gray-100/90 transition-all">
                  <span className="text-[11px] sm:text-base">프로젝트 제안서</span>
                </button>
                <button className="px-3 sm:px-6 py-2 bg-gray-50/80 border border-gray-200 rounded-full hover:bg-gray-100/90 transition-all">
                  <span className="text-[11px] sm:text-base">린캔버스</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
