'use client'

import Image from 'next/image';

interface CheerButtonProps {
    isLiked: boolean;
    likeCount: number;
    onToggleLike: () => void;
}

export default function CheerButton({ isLiked, likeCount, onToggleLike }: CheerButtonProps) {
    return isLiked ? (
        <div className="flex flex-col items-start gap-3 w-[113px] shrink-0">
            <button
                className="flex items-center justify-center h-[51px] self-stretch rounded-[30px] border border-[#776BFF] bg-[#FEFEFE] text-gray-600"
                onClick={onToggleLike}
            >
                <Image
                    src="/assets/icons/cheer_button.svg"
                    width={24}
                    height={30}
                    alt="Cheer icon"
                    className="mr-2" // Right margin to space icon and text
                />
                <span
                    className="flex w-[34px] h-[38px] flex-col justify-center text-[#776BFF] font-pretendard font-bold text-[19px] leading-[28.5px]"
                >
                    {likeCount}
                </span>
            </button>
            <span className="w-full text-center text-[#776BFF] font-pretendard font-semibold text-[16px] leading-[24px]">
                응원완료
            </span>
        </div>
    ) : (
        <div className="flex flex-col items-center gap-3 w-[113px] shrink-0">
            <button
                className="flex items-center justify-center h-[51px] self-stretch rounded-[30px] border bg-[#f4f6fa] text-black border-[#E2E6EF]"
                onClick={onToggleLike}
            >
                <Image
                    src="/assets/icons/cheer_button.svg"
                    width={24}
                    height={30}
                    alt="Cheer icon"
                    className="mr-2" // Right margin to space icon and text
                />
                <span
                    className="flex w-[34px] h-[38px] flex-col justify-center text-[#0F1011] font-pretendard font-bold text-[19px] leading-[28.5px]"
                >
                    {likeCount}
                </span>
            </button>
            <span className="w-full text-center text-[#0F1011] font-pretendard font-semibold text-[16px] leading-[24px]">
                응원하기
            </span>
        </div>
    );
}
