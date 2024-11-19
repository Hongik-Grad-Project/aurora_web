'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// 미리 정의된 AI 응답들
const AI_RESPONSES = [
  "노인 일자리 문제가 어떻게 심각한가요?",
  "회사에 다니는 사람은 은퇴 후 뭘 하고 싶어 하나요?",
  "그중에서도 어떤 사람을 돕고 싶은가요?",
  "어떻게 돕고 싶은가요?",
];

export default function ChatAuroraDemo() {
  const [chatHistory, setChatHistory] = useState<Array<{
    senderType: 'MEMBER' | 'AURORA_AI';
    contents: string;
    createdAt: string;
  }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentAIResponseIndex, setCurrentAIResponseIndex] = useState(0);

  // AI 응답을 보내는 함수 추가
  const sendAIResponse = () => {
    if (currentAIResponseIndex < AI_RESPONSES.length) {
      setTimeout(() => {
        addNewMessage(AI_RESPONSES[currentAIResponseIndex], false);
        setCurrentAIResponseIndex(prev => prev + 1);
      }, 1000); // 1초 후 AI 응답
    }
  };

  // 새로운 메시지 추가 함수 수정
  const addNewMessage = (message: string, isUser: boolean) => {
    const newMessage = {
      senderType: isUser ? 'MEMBER' : 'AURORA_AI',
      contents: message,
      createdAt: new Date().toISOString()
    } as const;
    
    setChatHistory(prev => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage?.contents === message && lastMessage?.senderType === newMessage.senderType) {
        return prev;
      }
      return [...prev, newMessage];
    });

    // 사용자 메시지가 추가되면 AI 응답 전송
    if (isUser) {
      sendAIResponse();
    }
  };

  // 채팅 기록을 전역으로 공유
  useEffect(() => {
    window.addDemoMessage = addNewMessage;
  }, [currentAIResponseIndex]);

  // 스크롤 자동 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // 스크롤 자동 이동
  return (
    <div className="flex flex-col w-full h-full bg-gray-100 relative">
      {/* Adjust the top margin on mobile screens */}
      <div className="flex-grow overflow-y-auto p-6 bg-white mt-[57px] lg:mt-0">
        {chatHistory.length > 0 ? (
          <div className="space-y-4 w-full">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`relative p-4 rounded-2xl text-lg ${message.senderType === 'AURORA_AI'
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
              <Image src="/assets/intro/section1_float_btn.png" alt="Aurora Logo" width={200} height={200} className="object-contain" />
            </motion.div>
            <div className="flex flex-col justify-center items-center mt-4">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-300">어떤 문서가 필요한가요?</h2>
              <div className="flex gap-4 mt-6">
                <button className="px-6 py-2 bg-gray-50/80 border border-gray-200 rounded-full hover:bg-gray-100/90 transition-all">
                  마케팅 기획서
                </button>
                <button className="px-6 py-2 bg-gray-50/80 border border-gray-200 rounded-full hover:bg-gray-100/90 transition-all">
                  사업 계획서
                </button>
                <button className="px-6 py-2 bg-gray-50/80 border border-gray-200 rounded-full hover:bg-gray-100/90 transition-all">
                  프로젝트 제안서
                </button>
                <button className="px-6 py-2 bg-gray-50/80 border border-gray-200 rounded-full hover:bg-gray-100/90 transition-all">
                  린캔버스
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}