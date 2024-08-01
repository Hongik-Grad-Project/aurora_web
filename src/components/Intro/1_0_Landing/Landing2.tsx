'use client'
import Link from 'next/link';

export default function Landing2() {
    return (
        <div
        style={{ backgroundImage: 'url("/assets/intro/section2bg.png")' }}
        className="relative flex h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-col items-center justify-center overflow-hidden overflow-x-auto bg-[#F0F2F6] bg-opacity-50 bg-cover bg-no-repeat"
        >
         <div className="flex w-[22.125rem] h-[3.75rem] p-[0.8125rem_1.375rem] justify-center items-center gap-[0.625rem] flex-shrink-0 rounded-[1rem] border border-[#FEFEFE] bg-[#FEFEFE] backdrop-blur-[12px]">
            <p className="text-center text-[1.25rem] font-normal text-darkGrey">사회 문제 해결의 시작은 오로라에서</p>
        </div>
        <div className="flex w-[43.625rem] h-[16.25rem] px-6 py-1 flex-col justify-center items-center gap-4 flex-shrink-0 rounded-[1rem] border border-[#E2E6EF] bg-[#FEFEFE] shadow-[0px_4px_64px_-10px_rgba(174,180,200,0.40)] backdrop-blur-[17px] mt-[1.25rem]">    
            <p className="text-[1.875rem]">
            🔍
            </p>
            <p className="text-[#0F1A2A] text-[1.875rem] font-bold leading-[2.8125rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
            어떤 사회문제를 해결해야 할지 모르겠나요?
            </p>
            <p className="self-stretch text-center text-[#4E525C] text-[1.25rem] font-medium leading-[1.875rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
            긍정적인 사회 변화를 위한 공익 프로젝트를 진행할 수 있어요!
            </p>
            <Link href="/chat/aurora">
                <div className="flex w-[13.75rem] h-[3.31138rem] flex-row justify-center items-center gap-[0.5rem] rounded-[0.3125rem] bg-[#776BFF] cursor-pointer hover:bg-[#6659e6] transition-colors">
                    <p className="text-white text-center w-[5.5rem] ml-[1.3rem]">
                    AI와 채팅하기
                    </p>
                    <img src="/assets/icons/speech_bubble.svg" alt="speech_bubble" className="w-[2.3125rem] h-[1.625rem]" />
                </div>
            </Link>
        </div>
      </div>
    )
  }
  