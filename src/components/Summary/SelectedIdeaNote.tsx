'use client'

import React, { useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenState, authState, summaryRoomsState, selectedSummaryContentState, selectedSummaryRoomIdState } from '@/context/recoil-context';
import Image from 'next/image';
import SummaryModal from './SummaryModal';
import SummaryDeleteModal from './SummaryDeleteModal';

export default function SelectedIdeaNote() {
    const accessToken = useRecoilValue(accessTokenState);
    const isAuth = useRecoilValue(authState) || false
    const selectedSummaryRoomId = useRecoilValue(selectedSummaryRoomIdState);
    const summaryContent = useRecoilValue(selectedSummaryContentState);
    const summaryRooms = useRecoilValue(summaryRoomsState);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const currentSummaryRoom = summaryRooms.find((sumRoom) => sumRoom.noteId === selectedSummaryRoomId);
    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
    const [isSummaryDeleteModalOpen, setIsSummaryDeleteModalOpen] = useState(false);

    return (
        <div className="flex flex-col w-full h-full bg-gray-100 relative">
            <div className="flex-grow overflow-y-auto p-6 bg-white">
                {currentSummaryRoom ? (
                    <div className="space-y-4">
                        {summaryContent ? (
                            <div className="space-y-6">
                                <div className="flex items-center gap-1.5 self-stretch rounded-md bg-[#776BFF] p-[0.5rem_1rem]">
                                    <Image src="/assets/icons/magic_wand_white.svg" width={20} height={20} alt="Aurora AI" className="w-[16px] h-[16px] sm:w-[24px] sm:h-[24px]" />
                                    <div className="text-[#FEFEFE] font-[Pretendard] text-xs sm:text-base font-medium leading-5 sm:leading-6">
                                        오로라 AI가 요약했어요!
                                    </div>
                                </div>
                                <div className="space-y-4 sm:space-y-7">
                                    <div>
                                        <h1 className="text-base sm:text-xl font-semibold mb-6 sm:mb-10">{summaryContent.title}</h1>
                                    </div>
                                    <div>
                                        <h2 className="text-sm sm:text-xl font-semibold mb-1 sm:mb-2">대상</h2>
                                        <p className="pl-4 text-xs sm:text-base">• {summaryContent.target}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-sm sm:text-xl font-semibold mb-1 sm:mb-2">문제</h2>
                                        <p className="pl-4 text-xs sm:text-base">• {summaryContent.problem}</p>
                                    </div>

                                    {Array.isArray(summaryContent.openTitleList) && Array.isArray(summaryContent.openSummaryList) ? (
                                        summaryContent.openTitleList.map((title, index) => (
                                            <div key={index} className="mb-2 sm:mb-4">
                                                <h2 className="text-sm sm:text-lg font-semibold mb-1">{title}</h2>
                                                <p className="pl-4 text-xs sm:text-base">• {summaryContent.openSummaryList[index]}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-xs sm:text-gray-500">대제목 및 소제목 데이터가 없습니다.</p>
                                    )}

                                    <div>
                                        <h2 className="text-sm sm:text-xl font-semibold mb-1 sm:mb-2">해결책</h2>
                                        <p className="pl-4 text-xs sm:text-base">• {summaryContent.solution}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 self-stretch rounded-md bg-[#F4F6FA] p-[0.5rem_1rem]">
                                    <Image src="/assets/icons/magic_wand_grey.svg" width={20} height={20} alt="Aurora AI" className="w-[16px] h-[16px] sm:w-[24px] sm:h-[24px]" />
                                    <div className="text-[#4E525C] font-[Pretendard] text-xs sm:text-base font-medium leading-5 sm:leading-6">
                                        프로젝트를 시작하기에 좋은 소스에요! 이 내용을 바탕으로 프로젝트를 시작해볼까요?
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => setIsSummaryDeleteModalOpen(true)}
                                        className="flex h-[2.5rem] sm:h-[3.14813rem] min-w-[4rem] sm:min-w-[5.39675rem] p-[0.8rem_1.2rem] sm:p-[1.01188rem_1.57406rem] justify-center items-center gap-[0.56219rem] rounded-[0.44975rem] bg-[#FEFEFE] text-[#776BFF] border border-[#776BFF] text-center align-middle font-pretendard text-xs sm:text-[1.01188rem] font-medium leading-5 sm:leading-[1.51781rem]">
                                        삭제하기
                                    </button>
                                    <button 
                                        onClick={() => setIsSummaryModalOpen(true)}
                                        className="flex h-[2.5rem] sm:h-[3.14813rem] min-w-[4rem] sm:min-w-[5.39675rem] p-[0.8rem_1.2rem] sm:p-[1.01188rem_1.57406rem] justify-center items-center gap-[0.56219rem] rounded-[0.44975rem] bg-[#776BFF] text-[#FEFEFE] text-center align-middle font-pretendard text-xs sm:text-[1.01188rem] font-medium leading-5 sm:leading-[1.51781rem]">
                                        기획서 작성하기
                                    </button>
                                </div>
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
            <SummaryModal isOpen={isSummaryModalOpen} onClose={() => setIsSummaryModalOpen(false)} />
            <SummaryDeleteModal isOpen={isSummaryDeleteModalOpen} onClose={() => setIsSummaryDeleteModalOpen(false)} />
        </div>
    );
}
