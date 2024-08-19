'use client'

export default function ProjectBodyText() {
    return (
        <div className="flex flex-col w-[58.75rem] items-start gap-[1.1875rem]">
            <div className="flex flex-col items-start gap-[1rem] self-stretch">
                <div className="flex flex-col items-end gap-[0.5rem] self-stretch">
                    <div className="flex flex-col justify-center items-start gap-[1.875rem] p-[1.25rem_1.75rem] self-stretch rounded-[0.4375rem] border border-[#AEA0FF] bg-[#FEFEFE]">
                        {/* Frame 1948755223 */}
                        <div className="flex flex-col items-start gap-[0.625rem] self-stretch">
                            <h2 className="self-stretch text-[#9DA1AD] font-pretendard text-[1.5rem] font-semibold leading-[2.25rem]">
                                소제목: 첫 문장이 가장 중요! 계속 읽고 싶게 쓰기
                            </h2>
                            <p className="text-[#9DA1AD] font-pretendard text-[0.75rem] font-normal leading-[1.125rem]">
                                0/60
                            </p>
                        </div>
                        {/* Frame 1948755224 */}
                        <div className="flex flex-col items-start gap-[1.875rem] self-stretch">
                            <div className="self-stretch text-[#9DA1AD] font-medium text-[1rem] leading-[1.5rem]">
                                본문: 이 내용을 모르는 사람도 공감할 수 있게
                            </div>
                            <div className="self-stretch text-[#9DA1AD] font-normal text-[0.75rem] leading-[1.125rem]">
                                0/1000
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}