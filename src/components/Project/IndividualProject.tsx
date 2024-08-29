'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { GetProjectGalleryDetail } from '@/lib/action'
import { ProjectGalleryDetailResponse } from '@/lib/types'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import Image from 'next/image'
import UnderpinList from '@/components/MyPage/UnderpinList'

export default function IndividualProject() {
    const accessToken = useRecoilValue(accessTokenState)
    const router = useRouter()
    const [data, setData] = useState<ProjectGalleryDetailResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)
    const pathname = usePathname()
    const pathSegments = pathname.split('/')
    const projectId = pathSegments[pathSegments.length - 1]
    const isAuth = useRecoilValue(accessTokenState)

    useEffect(() => {
        if (accessToken && projectId) {
            const fetchData = async () => {
                try {
                    const result = await GetProjectGalleryDetail(accessToken, parseInt(projectId, 10))
                    if (result.ok) {
                        const resultData = await result.json()
                        setData(resultData)
                    } else {
                        const resultData = await result.json()
                    }
                } catch (error) {
                    setError(error as Error)
                } finally {
                    setLoading(false)
                }
            }
            fetchData()
        }
    }, [accessToken, projectId])

    if(error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="flex w-full flex-col justify-center items-center pt-[70px] bg-[#FFF]">
            {/* 바깥 프레임 */}
            <div className="flex flex-col items-center gap-[3.125rem] w-[45.3125rem] mt-[4.21rem]">
                {/* 제목, 이미지, 태그 프레임 */}
                <div className="flex flex-col items-start gap-[2.1875rem] self-stretch">
                    <div className="flex flex-col items-start gap-[2.3125rem] self-stretch">
                        <div className="flex flex-col items-start gap-[0.4375rem] self-stretch">
                            <div className="flex justify-between items-center self-stretch">
                                <div className="flex h-[1.8125rem] px-[0.75rem] py-[0.1875rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-[rgba(225,220,255,0.40)]">
                                    <span className="text-[#776BFF] font-medium text-[0.875rem] leading-[1.3125rem]">
                                        어려운 이웃
                                    </span>
                                </div>
                                <span className="text-[#6A6F7A] font-medium text-[0.875rem] leading-[1.3125rem]">
                                    작성일자  |  2024.02.11
                                </span>
                            </div>
                            <span className="text-[#0F1011] font-semibold text-2xl leading-loose self-stretch">
                                은퇴 후 사업 시작, 안전하게!
                            </span>
                            <div className="flex h-6 px-3 items-center gap-1 rounded-sm bg-[#F4F6FA]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" viewBox="0 0 11 14" fill="none">
                                    <path d="M9.50245 6.39985C9.32998 6.17489 9.12002 5.97993 8.92506 5.78496C8.42265 5.33505 7.85275 5.01261 7.37284 4.54019C6.25555 3.44539 6.00809 1.63822 6.72046 0.250977C6.00809 0.423445 5.38571 0.813374 4.8533 1.2408C2.91116 2.80051 2.1463 5.55251 3.06113 7.91457C3.09113 7.98956 3.12112 8.06455 3.12112 8.16203C3.12112 8.327 3.00864 8.47697 2.85867 8.53696C2.6862 8.61195 2.50623 8.56695 2.36376 8.44698C2.3212 8.41133 2.28561 8.3681 2.25878 8.3195C1.41143 7.2472 1.27646 5.70998 1.84635 4.4802C0.594084 5.50002 -0.0882913 7.2247 0.00919087 8.8519C0.0541826 9.22683 0.0991744 9.60176 0.226651 9.9767C0.331632 10.4266 0.534095 10.8765 0.759054 11.274C1.56891 12.5712 2.97115 13.5011 4.47837 13.6885C6.08308 13.891 7.80026 13.5985 9.03004 12.4887C10.4023 11.244 10.8822 9.24933 10.1773 7.53964L10.0798 7.34468C9.92238 6.99974 9.50245 6.39985 9.50245 6.39985ZM7.13289 11.124C6.92292 11.304 6.57799 11.4989 6.30804 11.5739C5.46819 11.8738 4.62835 11.4539 4.13344 10.959C5.02577 10.7491 5.55817 10.0892 5.71565 9.4218C5.84312 8.82191 5.60317 8.327 5.50568 7.7496C5.4157 7.19471 5.4307 6.72229 5.63316 6.20489C5.77563 6.48983 5.92561 6.77478 6.10557 6.99974C6.68297 7.7496 7.5903 8.07954 7.78527 9.09936C7.81526 9.20434 7.83026 9.30932 7.83026 9.4218C7.85275 10.0367 7.5828 10.7116 7.13289 11.124Z" fill="#776BFF" />
                                </svg>
                                <span className="text-[#0F1011] font-pretendard font-bold text-sm leading-[1.3125rem]">
                                    105
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 메인 이미지 */}
                    <div className="h-[21.6875rem] self-stretch rounded-sm bg-[#EBEFFF]">

                    </div>

                    {/* 태그 */}
                    <div className="flex items-start gap-[0.4375rem]">
                        <div className="flex self-stretch h-[2.4375rem] px-5 justify-center items-center gap-2 rounded-full border border-[#AEA0FF] bg-[#FEFEFE]">
                            <span className="text-[#776BFF] font-pretendard font-medium text-sm leading-[1.3125rem]">
                                #고령화
                            </span>
                        </div>
                        <div className="flex self-stretch h-[2.4375rem] px-5 justify-center items-center gap-2 rounded-full border border-[#AEA0FF] bg-[#FEFEFE]">
                            <span className="text-[#776BFF] font-pretendard font-medium text-sm leading-[1.3125rem]">
                                #일자리 부족
                            </span>
                        </div>
                        <div className="flex self-stretch h-[2.4375rem] px-5 justify-center items-center gap-2 rounded-full border border-[#AEA0FF] bg-[#FEFEFE]">
                            <span className="text-[#776BFF] font-pretendard font-medium text-sm leading-[1.3125rem]">
                                #세대 갈등
                            </span>
                        </div>
                    </div>
                </div>

                <span className="self-stretch text-[#0F1011] font-pretendard font-medium text-base leading-[1.55] tracking-tight">
                    노인 일자리 문제
                    현대 사회에서 노인 인구는 빠르게 증가하고 있으며, 이로 인해 노인들의 경제적 자립과 사회적 참여 문제가 중요한 과제로 떠오르고 있습니다. 많은 노인들이 은퇴 후에도 일하고 싶어 하지만, 다양한 이유로 인해 일자리를 찾는 것이 어려운 현실입니다. 연령에 따른 편견, 최신 기술과 동향에 대한 부족한 이해, 그리고 적합한 일자리의 부재가 이러한 문제를 악화시키고 있습니다.

                    달란트: 은퇴 후 사업 성공을 위한 네트워킹 플랫폼
                    이러한 문제를 해결하기 위해 달란트라는 플랫폼을 소개합니다. 달란트는 은퇴 후 사업을 시작하고자 하는 노인들을 위한 종합 지원 플랫폼으로, 성공적인 사업 후기를 공유하고, 최신 동향에 대한 정보를 제공하며, 네트워킹 기회를 제공합니다. 이를 통해 노인들이 최신 비즈니스 트렌드를 파악하고, 실제 성공 사례를 통해 자신감을 얻으며, 비슷한 관심사를 가진 사람들과 연결될 수 있도록 돕습니다.

                    주요 기능
                    1.. 사업 성공 후기 공유: 다양한 업종에서 은퇴 후 사업에 성공한 노인들의 생생한 후기를 모아, 새로운 도전의 영감을 제공합니다.
                    2. 최신 동향 정보 제공: 전문가들이 제공하는 최신 비즈니스 트렌드와 기술 정보를 통해 노인들이 최신 동향을 빠르게 습득할 수 있도록 돕습니다.
                    3. 네트워킹 기회: 온라인 및 오프라인 이벤트를 통해 비슷한 관심사를 가진 노인들이 서로 연결되고, 협력할 수 있는 장을 제공합니다.

                    기대 효과
                    달란트를 통해 은퇴 후에도 활발하게 경제활동을 이어갈 수 있는 기회를 제공함으로써, 노인들의 경제적 자립을 지원하고, 사회적 고립을 예방하며, 궁극적으로 노인 일자리 문제를 해결하는데 기여하고자 합니다. 달란트는 노인들이 자신의 경험과 지혜를 발휘하여 새로운 도전에 나설 수 있도록 도우며, 더 나은 사회를 만들어가는 데 일조할 것입니다.
                </span>

                {/* 응원하기 컴포넌트 */}

                <div className="flex flex-col items-start gap-[1.25rem]">
                    <div className="flex flex-col w-[45.25rem] p-4 items-start gap-[0.875rem] rounded-xl border border-[#E2E6EF] bg-[#FEFEFE]">
                        <div className="flex items-center gap-[0.875rem]">
                            <div className="flex w-[16.5625rem] flex-col items-start gap-[0.875rem]">
                                <div className="flex items-end gap-2">
                                    <Image src="/assets/icons/my_profile_icon.svg" alt="기본 프로필" width={44} height={44} objectFit="contain" />
                                    <div className="flex flex-col items-start">
                                        <span className="self-stretch text-[#6A6F7A] font-pretendard text-sm font-normal leading-[1.125rem]">
                                            제안자
                                        </span>
                                        <span className="text-[#0F1011] font-pretendard text-base font-medium leading-[1.5rem]">
                                            박상진
                                        </span>
                                    </div>
                                </div>

                                <div className="flex w-[9.8125rem] px-[0.6875rem] py-[0.1875rem] justify-center items-center gap-[0.625rem] rounded bg-250-LightPurple">
                                    <span className="text-[#4E525C] font-pretendard text-sm font-normal">
                                        e-mail: 00@000.com
                                    </span>
                                </div>
                            </div>
                        </div>
                        <span className="self-stretch text-[#0F1011] font-pretendard font-medium text-base leading-[1.5rem]">
                            열정이 가득한 팀원을 모집중입니다. 이메일로 연락주세요!
                        </span>
                    </div>
                </div>

                <div className="self-stretch h-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="725" height="2" viewBox="0 0 725 2" fill="none">
                        <path d="M725 1H0" stroke="#E2E6EF" strokeWidth="1" />
                    </svg>
                </div>

                {/* 오로라의 다른 글을 살펴보세요 */}
                <div className="flex flex-col items-center gap-[2.125rem] self-stretch">
                    <div className="flex flex-col items-center gap-[2.125rem] p-[1.25rem] self-stretch rounded-[1rem] border border-[#E2E6EF]">
                        <span className="self-stretch text-[#4E525C] text-center font-pretendard text-2xl font-semibold leading-[2.25rem]">
                            오로라의 다른 글을 살펴보세요
                        </span>
                        <div className="flex flex-col items-start">
                            <div className="-mt-[0.0625rem]">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 