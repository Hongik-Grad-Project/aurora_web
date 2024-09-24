'use client'

import { useState } from 'react';

interface LableBtnProps {
    text: string;
    onClick: (value: string, isActive: boolean) => void; // onClick 핸들러를 prop으로 추가
}

export default function LableBtn({ text, onClick }: LableBtnProps) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(prev => {
            const newActive = !prev;
            onClick(text, newActive); // 부모 컴포넌트에게 변경된 상태를 전달
            return newActive;
        });
    };

    return (
        <div onClick={handleClick} className="cursor-pointer">
            {isActive ? (
                <div className="flex justify-center items-center gap-[0.25rem] px-[0.9375rem] py-[0.5rem] rounded-full border border-[#776BFF] bg-[#776BFF]">
                    <span className="text-[#FEFEFE] font-medium text-[1.125rem] leading-[1.6875rem]">
                        {text}
                    </span>
                </div>
            ) : (
                <div className="flex justify-center items-center gap-[0.25rem] px-[0.9375rem] py-[0.5rem] rounded-full border border-[#776BFF] bg-[#FEFEFE]">
                    <span className="text-[#776BFF] font-medium text-[1.125rem] leading-[1.6875rem]">
                        {text}
                    </span>
                </div>
            )}
        </div>
    );
}
