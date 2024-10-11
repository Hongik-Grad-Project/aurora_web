'use client'

import { useRouter } from 'next/navigation';

export default function Landing8() {
    const router = useRouter();

    return (
        <div className="relative flex justify-center h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-row overflow-hidden overflow-x-auto bg-cover bg-no-repeat pt-[5rem]"
            style={{
                background: 'linear-gradient(180deg, #E2DDFF 0%, #AEA0FF 100%)',
            }}
        >
            <div className="flex w-full flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center mb-[3.91rem]">
                    <div className="flex flex-col justify-center items-center gap-[0.5rem]">
                        <p className="text-[#0F1011] text-[1.25rem] font-Medium leading-[1.875rem] opacity-80">
                            의미있는 프로젝트를 하고싶나요?
                        </p>
                        <h1
                            className="text-[#0F1A2A] text-[2.625rem] font-bold leading-[3.625rem]"
                        >
                            지금, 오로라에서 다양한 프로젝트를 살펴보세요
                        </h1>

                    </div>
                </div>
                <button
                    className="flex py-[1.75rem] px-[3.3125rem] justify-center items-center gap-[0.625rem] rounded-[0.625rem] bg-[#776BFF] shadow-[0px_30px_59.9px_-28px_#8684A2] hover:bg-[#9B8AFF] hover:scale-105 transition-transform duration-200"
                    onClick={() => router.push('/project/gallery')} // 버튼 클릭 시 /project/gallery로 이동
                >
                    <span
                        className="text-white text-[1.5rem] font-semibold leading-[2.25rem]"
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                    >
                        프로젝트 둘러보기
                    </span>
                </button>
            </div >
        </div >
    )
}