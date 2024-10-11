'use client'
import { useRouter } from 'next/navigation';

export default function Landing8() {
    const router = useRouter();

    return (
        <div className="relative flex justify-center items-center h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-col overflow-hidden bg-cover bg-no-repeat pt-[3rem] md:pt-[5rem]"
            style={{
                background: 'linear-gradient(180deg, #E2DDFF 0%, #AEA0FF 100%)',
            }}
        >
            <div className="flex w-full flex-col justify-center items-center px-4 md:px-8 gap-[2rem]">
                <div className="flex flex-col justify-center items-center text-center mb-[2rem] md:mb-[3.91rem]">
                    <p className="text-[#0F1011] text-[1rem] md:text-[1.25rem] font-medium leading-[1.375rem] md:leading-[1.875rem] opacity-80">
                        의미있는 프로젝트를 하고싶나요?
                    </p>
                    <h1
                        className="text-[#0F1A2A] text-[1.875rem] md:text-[2.625rem] font-bold leading-[2.375rem] md:leading-[3.625rem]"
                    >
                        지금, 오로라에서 <br className="block md:hidden" />다양한 프로젝트를 살펴보세요
                    </h1>
                </div>
                <button
                    className="flex py-[1.25rem] md:py-[1.75rem] px-[2rem] md:px-[3.3125rem] justify-center items-center gap-[0.625rem] rounded-[0.625rem] bg-[#776BFF] shadow-[0px 20px 40px -14px #8684A2] hover:bg-[#9B8AFF] hover:scale-105 transition-transform duration-200"
                    onClick={() => router.push('/project/gallery')} // 버튼 클릭 시 /project/gallery로 이동
                >
                    <span
                        className="text-white text-[1.25rem] md:text-[1.5rem] font-semibold leading-[1.75rem] md:leading-[2.25rem]"
                    >
                        프로젝트 둘러보기
                    </span>
                </button>
            </div>
        </div>
    )
}
