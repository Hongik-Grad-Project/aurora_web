'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('')
    
    const tags = [
        '여성', '지구촌', '유기동물', '주거개선', '여러운 이웃',
        '장애인 시설', '장애인', '청년', '아동 | 청소년', '이주민 | 다문화'
    ]

    return (
        <div className="flex w-[69.40625rem] flex-col items-start gap-[1rem] pt-[2.91rem]">
            <div className="flex w-full flex-col justify-center items-center mb-[1.38rem]">
                <h1 className="text-center text-[2.5rem] font-semibold mt-[5.19rem] mb-[5.06rem]">
                    어떤 방식의
                    <br />
                    프로젝트를 찾고 있나요?
                </h1>
                <div className="flex w-[69.40625rem] items-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="검색어를 입력하세요"
                        className="flex w-[67.3125rem] h-[3rem] text-[#6A6F7A] text-[2rem] font-semibold focus:outline-none placeholder-opacity-100 placeholder-[#6A6F7A] mb-[0.94rem]"
                    />
                    <button className="flex items-center justify-center h-[3rem] w-[3rem] bg-transparent border-none cursor-pointer">
                        <Image src="/assets/icons/search_icon.svg" alt="검색" width={34} height={34} className="opacity-30" />
                    </button>
                </div>
                <svg width="69.40625rem" height="0.1875rem">
                    <line x1="0" y1="0" x2="69.40625rem" y2="0" stroke="#E2E6EF" strokeWidth="3" />
                </svg>
            </div>
            
            <div className='flex flex-col w-full'>
                <p className="text-[1rem] font-normal text-black mb-[1rem]">
                    태그로 찾기
                </p>
                <div className="flex flex-wrap gap-4">
                    {tags.map((tag, index) => (
                        <button
                            key={index}
                            className="px-4 py-2 rounded-full border border-[#776BFF] text-[#776BFF] hover:bg-[#6A6F7A] hover:text-white transition-colors whitespace-nowrap"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
