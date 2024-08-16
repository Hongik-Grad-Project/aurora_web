'use client'

import React from 'react';

interface TextLayoutProps {
    title: string;
    description: React.ReactNode; // string 대신 React.ReactNode로 변경
}

export default function TextLayout({ title, description }: TextLayoutProps) {
    return (
        <div className="flex flex-col items-start gap-[0.625rem] self-stretch">
            <div className="self-stretch">
                <span className="text-[1.625rem] font-semibold leading-[2.4375rem] text-[#0F1011]">
                    {title} <span className="text-[#776BFF]">*</span>
                </span>
                <div className="self-stretch text-[#4E525C] mt-2">
                    <p className="text-[1rem] font-medium leading-[1.5rem]">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}
