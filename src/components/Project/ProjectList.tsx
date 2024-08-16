'use client'

import Image from 'next/image'

export default function ProjectList() {
    return (
        <div className="flex w-[16.25rem] h-[46.25rem] p-[1.3125rem_0.5rem] flex-col items-start gap-[0.625rem] rounded-[1rem] bg-[#FEFEFE]">
            <div className="flex h-[3.5rem] px-[0.5rem] items-center flex-shrink-0 self-stretch rounded-[0.5rem] border border-[#AEA0FF]">
                <div className="flex w-[11.9375rem] h-[3.375rem]">
                    <Image
                        src="/assets/icons/magic_wand.svg"
                        width={54}
                        height={54}
                        alt="Magic Wand Icon"
                        className="flex justify-center items-center w-[3.375rem] h-[3.375rem]"
                    />
                    <div className="flex justify-center items-center text-[#776BFF] font-medium text-[1rem] leading-[1.5rem]">
                        새로운 대화 생성하기
                    </div>
                </div>
            </div>
        </div>
    )
}
