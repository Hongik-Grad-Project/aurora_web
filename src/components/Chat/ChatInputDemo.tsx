'use client'

import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { accessTokenState, authState, selectedChatRoomIdState, selectedChatHistoryState, chatRoomsState } from '@/context/recoil-context';
import { Message as AuroraMessage } from '@/lib/types';
import ChatModal from './ChatModal';
import Image from 'next/image';
import ChatRouteNoteModal from './ChatRouteNoteModal';
import ChatDeleteModal from './ChatDeleteModal';

export default function ChatInputDemo() {
    const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState);
    const [chatRooms, setChatRooms] = useRecoilState(chatRoomsState); // 현재 채팅방 리스트 상태
    const [inputValue, setInputValue] = useState<string>('');
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [isChatDeleteModalOpen, setIsChatDeleteModalOpen] = useState(false);
    const [isChatRouteNoteModalOpen, setIsChatRouteNoteModalOpen] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentChatRoom = chatRooms.find((room) => room.chatRoomId === selectedChatRoomId);

  const userMessage: AuroraMessage = {
      contents: inputValue,
      senderType: 'MEMBER',
      createdAt: new Date().toISOString(),
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    autoResizeTextarea();
  };


    const autoResizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && window.addDemoMessage) {
      window.addDemoMessage(inputValue.trim(), true);
      autoResizeTextarea();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setInputValue('');
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white p-4 border-t border-gray-200">
        {currentChatRoom?.isSummarized ? (
            <div className="flex items-end gap-[0.75rem] w-full max-w-7xl mx-auto relative">
                <button 
                    onClick={() => setIsChatDeleteModalOpen(true)}
                    className="flex justify-center items-center px-4 py-2 rounded-[1rem] border border-[#776BFF] text-[#776BFF] hover:bg-[#F9F8FF] transition-colors"
                    style={{ height: '3.2rem' }}
                >
                    삭제하기
                </button>
                <div className="flex-grow flex items-center px-[1.5rem] py-[0.25rem] rounded-[1rem] border border-[#AEA0FF] bg-white relative">
                    <div
                        className="w-full text-[#6A6F7A] font-medium text-[1rem] leading-[1.5rem] overflow-hidden"
                        style={{ minHeight: '1.5rem', maxHeight: '6rem', padding: '0.5rem 0' }}
                    >
                        요약이 완료된 채팅입니다
                    </div>
                    <button
                        className="hidden sm:flex right-[10px] bottom-[7px] w-[35px] h-[35px] cursor-pointer"
                    >
                        <Image src="/assets/icons/chat_not_send_button.svg" alt="Send" width={35} height={35} />
                    </button>
                </div>
                <button
                    onClick={() => setIsChatRouteNoteModalOpen(true)}
                    className="flex justify-center items-center gap-[0.625rem] rounded-[1rem] bg-[#776BFF] text-white font-semibold transition duration-300 ease-in-out hover:bg-[#F9F8FF] hover:text-[#776BFF]"
                    style={{ height: '3.2rem', padding: '0.5rem 1.5rem' }} // 높이 고정
                >
                    요약으로 이동
                </button>
            </div>
        ) : (
            <div className="flex items-end gap-[0.75rem] w-full max-w-7xl mx-auto relative">
                <button 
                    onClick={() => setIsChatDeleteModalOpen(true)}
                    className="flex justify-center items-center px-4 py-2 rounded-[1rem] border border-[#776BFF] text-[#776BFF] hover:bg-[#F9F8FF] transition-colors"
                    style={{ height: '3.2rem' }}
                >
                    삭제하기
                </button>   

                <div className="flex-grow flex items-center px-[1.5rem] py-[0.25rem] rounded-[1rem] border border-[#AEA0FF] bg-white relative">
                    <textarea 
                        ref={textareaRef}
                        className="w-full text-[#6A6F7A] font-medium text-[1rem] leading-[1.5rem] resize-none outline-none overflow-hidden" 
                        placeholder="오로라와 얘기해보세요" 
                        value={inputValue} 
                        onInput={handleInput}
                        onKeyUp={handleKeyDown}
                        rows={1} 
                        style={{ minHeight: '1.5rem', maxHeight: '6rem', padding: '0.5rem 0' }} 
                    />
                    <button 
                        onClick={handleSubmit}
                        className="absolute right-[10px] bottom-[7px] w-[35px] h-[35px] cursor-pointer"
                    >
                        <Image 
                            src="/assets/icons/chat_send_button.svg" 
                            alt="Send" 
                            width={35} 
                            height={35} 
                        />
                    </button>
                </div>
                <button
                    onClick={() => setIsChatModalOpen(true)}
                    className="flex justify-center items-center gap-[0.625rem] rounded-[1rem] bg-[#776BFF] text-white font-semibold transition duration-300 ease-in-out hover:bg-[#F9F8FF] hover:text-[#776BFF]"
                    style={{ height: '3.2rem', padding: '0.5rem 1.5rem' }} // 높이 고정
                >
                    대화 끝내기
                </button>
            </div>
        )}
        <ChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />
        <ChatDeleteModal isOpen={isChatDeleteModalOpen} onClose={() => setIsChatDeleteModalOpen(false)} />
        <ChatRouteNoteModal isOpen={isChatRouteNoteModalOpen} onClose={() => setIsChatRouteNoteModalOpen(false)} />
    </div>
);
}

// TypeScript type declaration
declare global {
  interface Window {
    addDemoMessage: (message: string, isUser: boolean) => void;
  }
}
