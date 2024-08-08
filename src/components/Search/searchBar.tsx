'use client'

import CategoryNav from '@/components/Gallery/Category'

export default function searchBar() {
    return (
        <div className="flex w-full flex-col justify-center items-center mb-[4.38rem]">
            <div className="flex w-[69.40625rem] items-center">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요" 
                    className="flex w-[67.3125rem] h-[3rem] text-[#6A6F7A] text-[2rem] font-semibold  focus:outline-none placeholder-opacity-100 placeholder-[#6A6F7A] mb-[0.94rem]"
                />
                <button className="flex items-center justify-center h-[3rem] w-[3rem] bg-transparent border-none cursor-pointer">
                    <img src="/assets/icons/search_icon.svg" alt="검색" className="h-[2.125rem] w-[2.125rem] opacity-30" />
                </button>
            </div>
            <svg width="69.40625rem" height="0.1875rem">
                <line x1="0" y1="0" x2="69.40625rem" y2="0" stroke="#E2E6EF" strokeWidth="3" />
            </svg>
            <div className='flex flex-col mt-[3rem]'>
                <p className="font-[1rem] font-normal font-[#000000] mb-[1rem]">
                   태그로 찾기
                </p>
                <CategoryNav />
            </div>
        </div>

    )
}