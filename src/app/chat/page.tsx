'use client';

import ChatAurora from '@/components/Chat/ChatAurora';
import ChatInput from '@/components/Chat/ChatInput';
import ChatNav from '@/components/Chat/ChatNav';
import { useEffect } from 'react';

export default function AuroraChatPage() {
    return (
        <div className="flex w-full h-screen">
            {/* 채팅방 목록과 채팅방 생성 버튼을 포함하는 사이드바 */}
            <div className="fixed left-0 top-0 h-full w-64 pt-[70px] border-r border-gray-300">
                <ChatNav />
            </div>
            {/* 채팅 기록과 선택된 채팅방의 내용을 표시하는 영역, 헤더 70px 고려 */}
            <div className="flex-grow ml-64 mt-[70px] mb-[84px]">
                <ChatAurora />
            </div>
            {/* 채팅 입력 영역, 하단 고정 및 측면 너비 조정 */}
            <div className="fixed bottom-0 left-64 right-0">
                <ChatInput />
            </div>
        </div>
    );
}
