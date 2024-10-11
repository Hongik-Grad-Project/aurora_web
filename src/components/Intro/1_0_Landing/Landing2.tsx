'use client'
import Link from 'next/link';
import Image from 'next/image';

export default function Landing2() {
    return (
        <div
            style={{ backgroundImage: 'url("/assets/intro/section2bg.png")' }}
            className="relative flex h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-col items-center justify-center overflow-hidden overflow-x-auto bg-[#F0F2F6] bg-opacity-50 bg-cover bg-no-repeat"
        >
            {/* 상단 텍스트 박스 */}
            <div className="flex w-full max-w-[18rem] md:max-w-[22.125rem] h-[3.75rem] p-[0.8125rem] justify-center items-center gap-[0.625rem] rounded-[1rem] border border-[#FEFEFE] bg-[#FEFEFE] backdrop-blur-[12px]">
                <p className="text-center text-[0.875rem] md:text-[1.25rem] font-normal text-darkGrey">
                    문제 해결의 시작은 오로라에서
                </p>
            </div>

            {/* 메인 컨텐츠 박스 */}
            <div className="flex w-full max-w-[22rem] md:max-w-[43.625rem] h-auto px-6 py-4 flex-col justify-center items-center gap-4 rounded-[1rem] border border-[#E2E6EF] bg-[#FEFEFE] shadow-[0px_4px_64px_-10px_rgba(174,180,200,0.40)] backdrop-blur-[17px] mt-[1.25rem]">
                <p className="text-[1.5rem] md:text-[1.875rem]">🔍</p>
                <p className="text-[#0F1A2A] text-[1.25rem] md:text-[1.875rem] font-bold leading-[1.75rem] md:leading-[2.8125rem] text-center">
                    어떤 문제를 <br className="block lg:hidden" /> 해결해야 할지 모르겠나요?
                </p>
                <p className="self-stretch text-center text-[#4E525C] text-[1rem] md:text-[1.25rem] font-medium leading-[1.5rem] md:leading-[1.875rem]">
                    긍정적인 변화를 위한 <br className="block lg:hidden" /> 프로젝트를 진행할 수 있어요!
                </p>

                {/* 버튼 */}
                <Link href="/chat">
                    <div className="flex w-[12rem] md:w-[13.75rem] h-[3rem] md:h-[3.31138rem] flex-row justify-center items-center gap-[0.5rem] rounded-[0.3125rem] bg-[#776BFF] cursor-pointer hover:bg-[#6659e6] transition-colors">
                        <p className="text-white text-center w-[6rem] md:w-[5.5rem] ml-[1rem] md:ml-[1.3rem]">
                            AI와 채팅하기
                        </p>
                        <Image
                            src="/assets/icons/speech_bubble.svg"
                            alt="speech_bubble"
                            width={30} // 반응형을 위한 크기 조절
                            height={21} // 반응형을 위한 크기 조절
                            className="md:w-[37px] md:h-[26px]"
                        />
                    </div>
                </Link>
            </div>
        </div>
    )
}
