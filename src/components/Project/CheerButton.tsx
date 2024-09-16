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
                className="flex items-center justify-center w-[113px] h-[51px] rounded-full border bg-[#F4F6FA] text-gray-600 border-[#E2E6EF]"
                onClick={onToggleLike}
            >
                응원하기 {likeCount}
            </button>
            <span>
                응원하기 취소
            </span>
        </div>
    ) : (
        <div className="flex flex-col items-start gap-3 w-[113px] shrink-0">
            <button
                className="flex items-center justify-center w-[113px] h-[51px] rounded-full border bg-[#f4f6fa] text-black border-[#E2E6EF]"
                onClick={onToggleLike}
            >
                <Image 
                    src="/assets/icons/cheer_button.svg"
                    width={20}
                    height={20}
                    alt="Cheer icon"
                    className="mr-2" // Right margin to space icon and text
                />
                {likeCount}
            </button>
            응원하기
        </div>
    );
}
