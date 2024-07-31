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
                <div className="inline-flex h-[2.6875rem] py-[0.5rem] px-[0.9375rem] justify-center items-center gap-[0.25rem] rounded-[6.25rem] border border-[#776BFF] bg-[#776BFF]">
                    <span className="text-[#FEFEFE] text-[1.125rem] font-medium">
                        {text}
                    </span>
                </div>
            ) : (
                <div className="inline-flex h-[2.6875rem] py-[0.5rem] px-[0.9375rem] justify-center items-center gap-[0.25rem] rounded-[6.25rem] border border-[#776BFF] bg-[#FEFEFE]">
                    <span className="text-[#776BFF] text-[1.125rem] font-medium">
                        {text}
                    </span>
                </div>
            )}
        </div>
    );
}