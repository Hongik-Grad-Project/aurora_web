'use client'

import ProjectTag from './Tag'

export default function projectWindow() {
    return (
        <div className="flex flex-col items-start mb-[4.38rem]">
            <div 
                className="flex w-[18.25rem] h-[12.5rem] rounded-[0.625rem] mb-[0.75rem]" 
                style={{ 
                    backgroundImage: 'url("/assets/images/no_image.png")' 
                }}
            >
            </div>
                <ProjectTag text="태그"/>
                <p className="text-[#0F1011] text-[1.125rem] font-semibold mb-[0.25rem]">
                    프로젝트 제목
                </p>
                <p className="text-[#4E525C] text-[0.875rem] font-normal">
                    문제 및 대상
                </p>
                <p className="text-[#9DA1AD] text-[0.875rem] font-normal">
                    날짜
                </p>
        </div>
    )
}