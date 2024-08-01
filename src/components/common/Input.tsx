'use client'

export default function Input() {
    return (
        <div className="flex flex-col items-start gap-[1.3125rem]">
            <div className="flex flex-col items-start gap-2">
            <span
                className="text-[#1E2A3B] text-[0.875rem] font-semibold leading-[1.375rem]"
            >
                이메일
            </span>
            <input
                type="text"
                className="w-[25.375rem] h-[2.75rem] py-[0.625rem] pl-[0.875rem] pr-[15.5625rem] rounded-[0.4375rem] border border-[#E2E8F0] bg-white"
                placeholder="여기에 입력하세요"
            />
            </div>
        </div>

    )
}