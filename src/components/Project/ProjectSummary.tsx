'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import PopUpAlertModal from '../common/CommonModal/PopUpAlertModal';
import Image from 'next/image'

export default function ProjectSummary() {
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
    const [aiSummary, setAiSummary] = useState('AI 요약 내용이 여기에 들어갑니다.') // AI 요약 내용을 관리할 상태
    const router = useRouter();

    const handleYesClick = () => {
        // AI 요약 내용을 placeholder로 전달하여 /project/outline 페이지로 이동
        router.push(`/project/outline?summary=${encodeURIComponent(aiSummary)}`);
    };

    const handleNoClick = () => {
        // 단순히 /project/outline 페이지로 이동
        router.push('/project/outline');
    };

    return (
        <>
            <div className="flex w-[46rem] flex-col items-end gap-[1rem]">
                <div className="flex p-[1.875rem] flex-col items-start gap-[1.5rem] self-stretch rounded-[1rem] bg-[#FEFEFE]">
                    {/* 오로라 AI가 요약했어요! 보라색 박스 */}
                    <div className="flex items-center gap-[0.375rem] p-[0.1875rem_0.5625rem] rounded-[0.5rem] bg-[#776BFF] self-stretch">
                        <Image
                            src="/assets/icons/magic_wand_white.svg"
                            alt="magic wand icon"
                            width={32}
                            height={32}
                            className="flex justify-center items-center"
                        />
                        <div className="text-[#FEFEFE] font-medium text-[0.875rem] leading-[1.3125rem]">
                            오로라 AI가 요약했어요!
                        </div>
                    </div>

                    {/* 프로젝트를 시작하기에 좋은 소스에요! 이 내용을 바탕으로 프로젝트를 시작해볼까요? */}
                    <div className="flex p-[0.1875rem_0.5625rem] items-center gap-[0.375rem] self-stretch rounded-[0.5rem] bg-[#F4F6FA]">
                        <Image
                            src="/assets/icons/magic_wand_grey.svg"
                            alt="magic wand grey icon"
                            width={32}
                            height={32}
                            className="flex justify-center items-center"
                        />
                        <div className="text-[#4E525C] font-medium text-[0.875rem] leading-[1.3125rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                            프로젝트를 시작하기에 좋은 소스에요! 이 내용을 바탕으로 프로젝트를 시작해볼까요?
                        </div>
                    </div>

                    {/* 기획서 작성하기 */}
                    <div className="flex h-[3.5rem] pl-[31.625rem] justify-end items-center self-stretch">
                        <button
                            onClick={() => setIsAlertModalOpen(true)}
                            className="flex h-[3.5rem] min-w-[6rem] px-[1.75rem] py-[1.125rem] justify-center items-center gap-[0.625rem] rounded-[0.5rem] bg-[#776BFF]">
                            <span className="text-[#FEFEFE] text-center text-[1.125rem] font-medium leading-[1.6875rem]">
                                기획서 작성하기
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <PopUpAlertModal
                isOpen={isAlertModalOpen}
                onClose={() => setIsAlertModalOpen(false)}
                text="AI로 기획서 초안을 작성하시겠습니까?"
                onYes={handleYesClick} // 예 버튼 클릭 핸들러
                onNo={handleNoClick} // 아니오 버튼 클릭 핸들러
            />
        </>
    )
}
