'use client'

interface TagProps {
    text: string;
}

export default function ProjectTag({ text }: TagProps) {
    // Define different background colors and text colors based on the tag text
    let bgColor = 'bg-[rgba(225,220,255,0.40)]'; // Default background color
    let textColor = 'text-[#776BFF]'; // Default text color

    // Conditional styles based on the tag content
    if (text === '작성중') {
        bgColor = 'bg-[rgba(197,234,194,0.40)]'; // Greenish background for "작성중"
        textColor = 'text-green-800'; // Dark green text for "작성중"
    } else if (text === '종료') {
        bgColor = 'bg-[rgba(222, 222, 222, 0.40)]'; // Red background for "종료"
        textColor = 'text-[#4E525C]'; // Dark red text for "종료"
    }

    return (
        <div className={`flex h-[1.8125rem] py-[0.1875rem] px-[0.75rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] ${bgColor} mb-[0.5rem]`}>
            <span className={`${textColor} text-[0.875rem] font-medium leading-[1.3125rem]`} style={{ fontFamily: 'Pretendard, sans-serif' }}>
                {text}
            </span>
        </div>
    );
}
