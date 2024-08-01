'use client'

import ProjectGallery from "@/components/Gallery/Window";

export default function Landing6() {
    return (
        <div className="relative flex h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-col overflow-hidden overflow-x-auto bg-[#FFFFFF] bg-cover bg-no-repeat pt-[5rem]">
            <div className="flex flex-col justify-center items-center">
                <p className="mt-[4.12rem] mb-[0.56rem]">
                    언제 어디서든, 간편한 아이디어 기록
                </p>
                <h1 className="text-[#0F1A2A] text-[2.625rem] font-bold leading-[3.625rem] mb-[1.19rem]" >
                    우리 서비스에서 이런 일이 있었어요
                </h1>
                <p className="text-[#475569] text-[1.25rem] font-medium leading-[1.875rem] opacity-80 mb-[2.44rem]" >
                    ㅇㅇㅇ
                </p>
                <div className="flex flex-row gap-[0.75rem]">
                    <ProjectGallery />
                    <ProjectGallery />
                    <ProjectGallery />
                </div>
            </div>
        </div>
    )
}