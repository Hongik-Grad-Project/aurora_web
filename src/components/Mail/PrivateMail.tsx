'use client'

export default function PrivateMail() {
    return (
        <div
            style={{
                backgroundColor: '#F0F2F6', // 폴백 배경색
                backgroundBlendMode: 'normal',
            }}
            className="flex h-screen min-h-screen w-full flex-col items-center justify-center pt-[5rem]"
        >
            <div className="flex w-[40.125rem] p-[3.75rem_1.25rem_5.625rem_1.25rem] flex-col items-start gap-[3.125rem] bg-white">
                <div className="flex flex-col justify-center items-center gap-[2.125rem] self-stretch">
                    <div className="flex flex-col items-start gap-[0.75rem] self-stretch">
                        <div className="flex w-[5.75rem] h-[1.09525rem] justify-center items-center">
                            <img src="/assets/colorLogo.svg" alt="Description" className="h-full object-contain" />
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="602"
                            height="2"
                            viewBox="0 0 602 2"
                            fill="none"
                        >
                            <path d="M602 0.523438H0" stroke="#CBD4E1" />
                        </svg>
                    </div>

                    <div
                        className="text-center text-[2.5rem] font-normal leading-[1.5625rem]"
                        style={{
                            color: 'var(--, #000)',
                            fontFamily: 'Pretendard, sans-serif',
                            fontFeatureSettings: "'liga' off, 'clig' off",
                        }}
                    >
                        👋👋
                    </div>
                    <div
                        className="text-[0.875rem] font-normal leading-[1.5625rem]"
                        style={{
                            color: 'var(--, #000)',
                            fontFamily: 'Pretendard, sans-serif',
                            fontFeatureSettings: "'liga' off, 'clig' off",
                        }}
                    >
                        [내 이름]님 안녕하세요, <div
                            className="text-[0.875rem] font-semibold leading-[1.5625rem] underline"
                            style={{
                                color: 'var(--Key-blue-key60, #2563EB)',
                                fontFamily: 'Pretendard, sans-serif',
                                fontFeatureSettings: "'liga' off, 'clig' off",
                            }}
                        >
                            링킷
                        </div> 입니다. <br />
                        [내 이름]님이 정성스럽게 써주신 이력서를 통해 <br />
                        [Sukki]님께서 <div
                            className="text-[0.875rem] font-bold leading-[1.5625rem]"
                            style={{
                                color: 'var(--, #000)',
                                fontFamily: 'Pretendard, sans-serif',
                                fontFeatureSettings: "'liga' off, 'clig' off",
                            }}
                        >
                            7월 12일
                        </div>
                        에 매칭 요청을 주셨습니다. <br />
                        소개글을 확인하고 매칭 요청에 응답해 보세요!
                    </div>




                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="0" fill="none">
                        <line x1="0" y1="0" x2="100%" y2="0" stroke="currentColor" />
                    </svg>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="602"
                        height="2"
                        viewBox="0 0 602 2"
                        fill="none"
                    >
                        <path d="M602 0.523438H0" stroke="#CBD4E1" />
                    </svg>

                </div>
                <div className="flex flex-col items-start gap-[1.125rem] self-stretch">
                    <div className="flex flex-col items-start gap-[0.75rem] self-stretch">
                        <div
                            className="self-stretch text-[1.875rem] font-bold"
                            style={{
                                color: 'var(--, #000)',
                                fontFamily: 'Pretendard, sans-serif',
                                fontFeatureSettings: "'liga' off, 'clig' off",
                                lineHeight: 'normal',
                            }}
                        >
                            📮
                        </div>
                        <div
                            className="self-stretch text-[1.2rem] font-bold"
                            style={{
                                color: 'var(--, #000)',
                                fontFamily: 'Pretendard, sans-serif',
                                fontFeatureSettings: "'liga' off, 'clig' off",
                                lineHeight: 'normal',
                            }}
                        >
                            Sukki님의 소개글
                        </div>
                        <div
                            className="self-stretch text-[0.875rem] font-normal leading-[1.5625rem]"
                            style={{
                                color: 'var(--, #000)',
                                fontFamily: 'Pretendard, sans-serif',
                                fontFeatureSettings: "'liga' off, 'clig' off",
                            }}
                        >
                            매칭 요청 본문
                        </div>

                    </div>

                </div>
                <div className="flex w-[37.625rem] p-[var(--Round,0.625rem)_1.25rem] items-end gap-[var(--Round,0.625rem)] rounded-[0.5rem] bg-[var(--Grey-scale-grey20,#F1F4F9)]">
                    <div className="flex w-[37.625rem] p-[var(--Round,0.625rem)_1.25rem] items-end gap-[var(--Round,0.625rem)] rounded-[0.5rem] bg-[var(--Grey-scale-grey20,#F1F4F9)]">
                        <div className="flex flex-col justify-center items-start gap-[var(--Round,0.625rem)] flex-1">
                            <div
                                className="text-[0.875rem] font-semibold leading-[1.5625rem]"
                                style={{
                                    color: 'var(--, #000)',
                                    fontFamily: 'Pretendard, sans-serif',
                                    fontFeatureSettings: "'liga' off, 'clig' off",
                                }}
                            >
                                Sukki님의 이력
                            </div>
                            <div
                                className="text-[0.875rem] font-normal leading-[1.4375rem]"
                                style={{
                                    color: 'var(--Grey-scale-grey80, #27364B)',
                                    fontFamily: 'Pretendard, sans-serif',
                                    fontFeatureSettings: "'liga' off, 'clig' off",
                                }}
                            >
                                홍익대학교 시각디자인과 재학 중 초기 창업팀 근무 경험(5개월)
                            </div>
                            <div className="flex justify-end items-center gap-[var(--Round,0.625rem)] self-stretch">
                                <div
                                    className="text-right text-[0.875rem] font-semibold leading-[1.5625rem]"
                                    style={{
                                        color: 'var(--, #000)',
                                        fontFamily: 'Pretendard, sans-serif',
                                        fontFeatureSettings: "'liga' off, 'clig' off",
                                    }}
                                >
                                    프로필 보러가기

                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="5"
                                    height="8"
                                    viewBox="0 0 5 8"
                                    fill="none"
                                >
                                    <path
                                        d="M1 1.02344L4 4.02344L1 7.02344"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="flex justify-center items-center self-stretch rounded-[0.5rem]"
                    style={{
                        height: '3.4375rem',
                        padding: '1.1875rem 13.1875rem 1.0625rem 13.1875rem',
                        backgroundColor: 'var(--Key-blue-key60, #2563EB)',
                    }}
                >
                    <div
                        className="text-[1rem] font-semibold"
                        style={{
                            color: 'var(--Grey-scale-grey00, #FFF)',
                            fontFamily: 'Pretendard, sans-serif',
                            fontFeatureSettings: "'liga' off, 'clig' off",
                            lineHeight: 'normal',
                        }}
                    >
                        Sukki님에게 응답하️기 ✍
                    </div>
                </div>
                <div className="flex flex-col justify-center items-start gap-[2.125rem] self-stretch">
                    <div className="flex flex-col items-start gap-[0.75rem] self-stretch">
                        <div className="flex w-[5.75rem] h-[1.09525rem] justify-center items-center">
                            <img src="/assets/colorLogo.svg" alt="Description" className="h-full object-contain" />
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="602"
                            height="2"
                            viewBox="0 0 602 2"
                            fill="none"
                        >
                            <path d="M602 1.04688H0" stroke="#CBD4E1" />
                        </svg>
                    </div>
                    <div
                        className="self-stretch text-[0.875rem] font-normal leading-[1.5625rem]"
                        style={{
                            color: 'var(--Grey-scale-grey60, #64748B)',
                            fontFamily: 'Pretendard, sans-serif',
                            fontFeatureSettings: "'liga' off, 'clig' off",
                        }}
                    >
                        메일링 후 필요한 푸터 내용이 있으면 여기 넣어주세요
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="602"
                        height="2"
                        viewBox="0 0 602 2"
                        fill="none"
                    >
                        <path d="M602 1.04688H0" stroke="#CBD4E1" />
                    </svg>
                </div>
            </div>
        </div>
    )
}