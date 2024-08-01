'use client'

export default function MyProfile() {
    return (
            <div className="flex flex-col items-start gap-[1.25rem] self-stretch">
                <h2 className="text-black text-[2.5rem] font-bold leading-[3.75rem] self-stretch mb-[1.25rem]">
                    마이 페이지
                </h2>
                    <div className="flex flex-col mb-[0.88rem]">
                        <div className="flex flex-row mb-[1.06rem]">
                            <div
                                className="w-[4.1875rem] h-[4.1875rem] mr-[0.5rem] rounded-[50%]" 
                                style={{
                                    background: '#FFFFFF',
                                    backgroundImage: 'url(/assets/icons/user_basic_profile.svg)',
                                    backgroundPosition: '100%',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat'
                                }}
                                >
                                <img src="/assets/icons/user_basic_profile.svg" alt="background" className="invisible w-[4.1875rem] h-[4.1875rem]" />
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="w-full text-[#6A6F7A] text-[1rem] font-medium leading-[1.5rem] mt-[0.41rem]">
                                    제안자
                                </div>
                                <div className="w-full text-[#0F1011] text-[1.25rem] font-bold leading-[1.875rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                                박상진
                                </div>
                            </div>
                        </div>
                        <div className="flex w-[9.8125rem] p-[0.1875rem] px-[0.6875rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-[#F9F8FF]">
                            <div className="text-[#4E525C] text-[0.75rem] font-normal leading-[1.125rem] tracking-[-0.0165rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                                e-mail: 0000@00000.com
                            </div>
                        </div>
                    </div>
                <div className="flex items-center gap-[0.875rem] self-stretch">
                <div className="text-[#0F1011] text-[1rem] font-medium leading-[1.5rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                        열정이 가득한 팀원을 모집중입니다. 이메일로 연락주세요!
                    </div>
                    <div className="flex h-[2.8125rem] pl-[21.0625rem] justify-end items-center flex-[1_0_0]">
                    <button className="flex h-[2.8125rem] p-[0.1875rem] px-[0.6875rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-[#F0F0F0]">
                        <span className="text-[#4E525C] text-[1rem] font-medium leading-[1.5rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                            프로필 수정하기
                        </span>
                    </button>
                    </div>
                </div>
        </div>
    )
}