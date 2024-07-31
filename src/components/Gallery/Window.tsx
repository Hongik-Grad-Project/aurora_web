'use client'

export default function projectWindow() {
    return (
        <div className="flex flex-col items-start">
            <div 
                className="flex w-[18.25rem] h-[12.5rem] rounded-[0.625rem]" 
                style={{ 
                    backgroundImage: 'url("/assets/images/no_image.png")' 
                }}
            >
                {/* 이미지가 여기에 들어갑니다 */}
            </div>
                <p className="text-[#0F1011] text-[1.125rem] font-semibold">
                    프로젝트 제목
                </p>
                <p className="text-[#4E525C] text-[0.875rem] font-normal">
                    문제 및 대상
                </p>
                <p className="text-[#9DA1AD] text-[0.875rem] font-normal">
                    날짜
                </p>
        </div>
    )
}