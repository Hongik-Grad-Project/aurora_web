'use client'

import { useState } from 'react';

interface LableBtnProps {
    text: string;
    onClick: (value: string, isActive: boolean) => void; // onClick 핸들러를 prop으로 추가
}

interface LableBtnProps {
    text: string;
    isActive?: boolean;  // isActive prop 추가
    onClick: (value: string, isActive: boolean) => void;
}

export default function LableBtn({ text, isActive: externalIsActive, onClick }: LableBtnProps) {
    const [internalIsActive, setInternalIsActive] = useState(false);
    const isActive = externalIsActive ?? internalIsActive;  // 외부에서 전달받은 값이 있으면 그 값을 사용

    const handleClick = () => {
        const newActive = !isActive;
        onClick(text, newActive);
    };

    return (
        <div onClick={handleClick} className="cursor-pointer">
            {isActive ? (
                <div className="flex justify-center items-center gap-[0.25rem] px-[0.625rem] py-[0.375rem] md:px-[0.9375rem] md:py-[0.5rem] rounded-full border border-[#776BFF] bg-[#776BFF]">
                    <span className="text-[#FEFEFE] font-medium text-[0.875rem] md:text-[1.125rem] leading-[1.25rem] md:leading-[1.6875rem]">
                        {text}
                    </span>
                </div>
            ) : (
                <div className="flex justify-center items-center gap-[0.25rem] px-[0.625rem] py-[0.375rem] md:px-[0.9375rem] md:py-[0.5rem] rounded-full border border-[#776BFF] bg-[#FEFEFE]">
                    <span className="text-[#776BFF] font-medium text-[0.875rem] md:text-[1.125rem] leading-[1.25rem] md:leading-[1.6875rem]">
                        {text}
                    </span>
                </div>
            )}
        </div>
    );
}
