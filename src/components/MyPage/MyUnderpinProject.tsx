'use client'

import UnderpinList from "./UnderpinList"

export default function MyUnderpinProject() {
    return (
        <div className="flex flex-col items-center gap-[2.1875rem] self-stretch">
            <div className="flex items-center gap-[3.6875rem] self-stretch">
                <div className="text-black text-[2rem] font-semibold leading-[3rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                    내가 응원한 프로젝트
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-[1.1875rem] self-stretch">
                <div className="flex flex-col items-start self-stretch">
                    <UnderpinList />
                    <UnderpinList />
                    <UnderpinList />
                </div>
            </div>
            <div className="flex w-[56.25rem] h-[2.8125rem] p-[0.5rem] px-[0.625rem] justify-center items-center gap-[0.625rem] rounded-[0.3125rem] bg-[#F4F6FA]">
                <div className="text-[#0F1011] text-center text-[1rem] font-medium leading-[1.5rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                    더보기
                </div>
            </div>
        </div>
    )
}