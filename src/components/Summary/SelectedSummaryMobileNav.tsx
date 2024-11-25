'use client'

import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useRouter, usePathname } from 'next/navigation';
import { summaryRoomsState, selectedSummaryRoomIdState } from '@/context/recoil-context';
import { SummaryRoom } from '@/lib/types';

export default function SelectedSummaryMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [summaryRooms] = useRecoilState<SummaryRoom[]>(summaryRoomsState);
  const [selectedSummaryRoomId, setSelectedSummaryRoomId] = useRecoilState(selectedSummaryRoomIdState);
  
  const router = useRouter();
  const pathname = usePathname();

  // 현재 선택된 요약 찾기
  const selectedSummary = summaryRooms.find(room => room.noteId === selectedSummaryRoomId);

  // 경로 이동 함수
  const onSelectSummaryRoom = (noteId: number) => {
    setSelectedSummaryRoomId(noteId);
    router.push(`/project/idea/${noteId}`);
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <div className="bg-white border-b border-gray-300">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-sm sm:text-lg font-semibold truncate max-w-[80%]">
          {selectedSummary?.title || '선택된 요약 없음'}
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      
      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute left-0 right-0 bg-white border-b border-gray-300 shadow-lg max-h-[70vh] overflow-y-auto">
          <div className="p-2 sm:p-4 space-y-2 sm:space-y-3">
            {summaryRooms.length === 0 ? (
              <div className="text-gray-500 p-2 sm:p-4 text-xs sm:text-base text-center">
                요약된 노트가 없습니다.
              </div>
            ) : (
              summaryRooms.map((sumRoom) => (
                <div
                  key={sumRoom.noteId}
                  className={`flex items-center justify-between p-2 sm:p-4
                    rounded-lg shadow-sm cursor-pointer transition duration-200
                    ease-in-out ${selectedSummaryRoomId === sumRoom.noteId 
                      ? "bg-[#EFEDFF] hover:bg-[#CEC6FF]" 
                      : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  onClick={() => onSelectSummaryRoom(sumRoom.noteId)}
                >
                  <div className="flex flex-col space-y-1">
                    <div className="text-xs sm:text-md font-medium text-gray-800">
                      {sumRoom.title}
                    </div>
                    <div className="text-[8px] sm:text-xs text-gray-400">
                      {new Date(sumRoom.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
} 