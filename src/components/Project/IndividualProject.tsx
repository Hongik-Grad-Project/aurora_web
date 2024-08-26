'use client'

export default function IndividualProject() {
    return (
        <div className="flex w-full flex-col justify-center items-center pt-[70px]">
            {/* 바깥 프레임 */}
            <div className="flex flex-col items-center gap-[3.125rem] w-[45.3125rem]">
                {/* 제목, 이미지, 태그 프레임 */}
                <div className="flex flex-col items-start gap-[2.1875rem] self-stretch">
                    <div className="flex flex-col items-start gap-[2.3125rem] self-stretch">
                        <div className="flex flex-col items-start gap-[0.4375rem] self-stretch">
                            <div className="flex justify-between items-center self-stretch">
                                <div className="flex h-[1.8125rem] px-[0.75rem] py-[0.1875rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-[rgba(225,220,255,0.40)]">
                                    <span className="text-[#776BFF] font-medium text-[0.875rem] leading-[1.3125rem]">
                                        어려운 이웃
                                    </span>
                                </div>
                                <span className="text-[#6A6F7A] font-medium text-[0.875rem] leading-[1.3125rem]">
                                    작성일자  |  2024.02.11
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 