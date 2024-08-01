'use client'

export default function UnderpinList() {
  return (
    <div className="flex h-[2.75rem] p-[0.5rem] px-[0.625rem] justify-between items-center self-stretch rounded-[0.3125rem] bg-[#FEFEFE]">
        <div className="flex w-[29.65625rem] items-center gap-[0.625rem]">
            <div className="flex h-[1.8125rem] p-[0.1875rem] px-[0.625rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-[rgba(225,220,255,0.40)]">
                <div className="text-[#776BFF] text-[0.75rem] font-normal leading-[1.125rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                    어려운 이웃
                </div>
            </div>
            <div className="text-[#0F1011] text-center text-[1rem] font-medium leading-[1.5rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                은퇴 후 사업 시작, 안전하게!
            </div>
        </div>
        <div className="text-[#6A6F7A] text-center text-[0.75rem] font-normal leading-[1.125rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
            24.02.01
        </div>
    </div>
  )
}