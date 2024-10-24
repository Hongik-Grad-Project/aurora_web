'use client';

import React, { useEffect, useRef } from 'react';
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
      {/* Adjust the top margin on mobile screens */}
      <div className="flex-grow overflow-y-auto p-6 bg-white mt-[57px] lg:mt-0">
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
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
              <Image src="/assets/intro/section1_float_btn.png" alt="Aurora Logo" width={200} height={200} className="object-contain" />
            </motion.div>
            <div className="flex flex-col justify-center items-center mt-4">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-300">Aurora Chat AI</h2>
              <p className="text-center text-gray-500 text-base mt-2">
                어떤 사회 문제를 해결하고 싶나요?
                <br />
                <span className="text-base text-gray-600">ex) 요즘 노인 일자리 문제가 심각한 것 같아</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
