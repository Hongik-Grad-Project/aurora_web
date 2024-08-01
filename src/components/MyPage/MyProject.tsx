'use client'

import ProjectWindow from "@/components/Gallery/Window"

export default function MyProject() {
    return (
        <div className="flex flex-col w-[56.25rem]">
            <div className="flex justify-between items-center self-stretch mb-[1.88rem]">
                <div className="text-black text-[2rem] font-semibold leading-[3rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                    나의 프로젝트
                </div>
                <div className="text-[#6A6F7A] text-[1rem] font-medium leading-[1.5rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                    더보기
                </div>
            </div>
            <div className="flex flex-row gap-[0.75rem]">
                <ProjectWindow />
                <ProjectWindow />
                <ProjectWindow />
            </div>
        </div>
    )   
}