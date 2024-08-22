'use client'

import { useState } from 'react'

interface LableBtnProps {
    text: string;
}

export default function LableBtn({ text }: LableBtnProps) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
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