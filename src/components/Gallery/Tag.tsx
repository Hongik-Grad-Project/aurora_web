'use client'

interface TagProps {
    text: string;
}

export default function projectTag({ text }: TagProps) {
    return (
        <div className="flex h-[1.8125rem] py-[0.1875rem] px-[0.75rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-[rgba(225,220,255,0.40)] mb-[0.5rem]">
            <span className="text-[#776BFF] text-[0.875rem] font-medium leading-[1.3125rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                {text}
            </span>
        </div>
    )
}