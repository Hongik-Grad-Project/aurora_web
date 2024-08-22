'use client'

export default function ChatInput() {
    return (
        <div className="flex w-full p-[1.25rem_0] flex-col justify-center items-center gap-[0.5rem] absolute bottom-0 left-0 bg-white shadow-[0px_-6px_44px_0px_rgba(231,232,247,0.4)]">
            {/* 하단 대화 입력창 */}
            <div className="flex justify-center items-center gap-[0.75rem] w-full">
                <div className="flex w-[42.6875rem] h-[3.5rem] px-[1.25rem] py-[0.625rem] justify-between items-center rounded-[1rem] border border-[#AEA0FF]">
                    <span className="text-[#6A6F7A] font-medium text-[1rem] leading-[1.5rem]">
                        메시지 Aurora AI
                    </span>
                </div>
                {/* 대화 끝내기 버튼 */}
                <button className="flex h-[3.5rem] min-w-[6rem] px-[1.75rem] py-[1.125rem] justify-center items-center gap-[0.625rem] rounded-[1rem] border border-[#E2E6EF] bg-[#F4F6FA]">
                    대화 끝내기
                </button>
            </div>
            {/* 가이드 안내 문구 */}
            <div className="w-full text-[#6A6F7A] text-center font-medium text-[0.875rem] leading-[1.3125rem]">
                여기다가 가이드를 적어주면 좋음 (레퍼런스: 챗지피티)
            </div>
        </div>
    )
}