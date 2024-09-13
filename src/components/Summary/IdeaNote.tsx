'use client'

import React, { useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { accessTokenState, authState, summaryRoomsState, selectedSummaryContentState, selectedSummaryRoomIdState } from '@/context/recoil-context';
import Image from 'next/image';

export default function IdeaNote() {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const isAuth = useRecoilValue(authState); // 로그인 여부 확인
    const selectedSummaryRoomId = useRecoilValue(selectedSummaryRoomIdState); // 현재 선택된 채팅방 ID
    const summaryContent = useRecoilValue(selectedSummaryContentState); // 현재 채팅 내역
    const summaryRooms = useRecoilValue(summaryRoomsState); // 채팅방 목록
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const currentSummaryRoom = summaryRooms.find((sumRoom) => sumRoom.noteId === selectedSummaryRoomId);

    console.log('currentSummaryRoom:', currentSummaryRoom);

    return (
        <div className="flex flex-col w-full h-full bg-gray-100 relative">
            <div className="flex-grow overflow-y-auto p-6 bg-white">
                {currentSummaryRoom ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-1.5 self-stretch rounded-md bg-[#776BFF] p-[0.5rem_1rem]">
                            <Image src="/assets/icons/magic_wand_white.svg" width={24} height={24} alt="Aurora AI" />
                            <div className="text-[#FEFEFE] font-[Pretendard] text-base font-medium leading-6">
                                오로라 AI가 요약했어요!
                            </div>
                        </div>
                        {summaryContent !== null ? (
                            <div className="space-y-2 mt-4">
                                <div className="text-lg font-semibold">Target: {summaryContent.target}</div>
                                <div className="text-lg font-semibold">Problem: {summaryContent.problem}</div>
                                <div className="text-lg font-semibold">Title: {summaryContent.title}</div>
                                <ul className="list-disc ml-5">
                                    {summaryContent.openTitleList.map((title, index) => (
                                        <li key={index}>{title}</li>
                                    ))}
                                </ul>
                                <ul className="list-disc ml-5">
                                    {summaryContent.openSummaryList.map((summary, index) => (
                                        <li key={index}>{summary}</li>
                                    ))}
                                </ul>
                                <div className="text-lg font-semibold">Solution: {summaryContent.solution}</div>
                            </div>
                        ) : (
                            <div className="flex flex-col justify-center items-center w-full h-full">
                                <div className="text-center">No summary selected.</div>
                            </div>
                        )}

                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center w-full h-full">
                        <div className="text-center">선택한 요약 노트가 없습니다.</div>
                    </div>
                )}
            </div>
        </div>
    );
}