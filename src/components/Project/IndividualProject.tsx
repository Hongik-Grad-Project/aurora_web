'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { GetProjectGalleryDetail, ToggleProjectLike, DeleteProject } from '@/lib/action'
import { ProjectGalleryDetailResponse } from '@/lib/types'
import { useRecoilValue } from 'recoil'
import { accessTokenState, authState } from '@/context/recoil-context'
import CheerButton from './CheerButton'
import Image from 'next/image'
import Footer from '../Layout/Footer'
import ProjectDeleteModal from './ProjectDeleteModal'

interface IndividualProjectProps {
    previousPath: string
}

export default function IndividualProject({previousPath}: IndividualProjectProps) {
    const accessToken = useRecoilValue(accessTokenState);  // accessToken 초기값을 빈 문자열로 유지
    const isAuth = useRecoilValue(authState);
    const router = useRouter();
    const [data, setData] = useState<ProjectGalleryDetailResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const pathname = usePathname();
    const pathSegments = pathname.split('/');
    const projectId = pathSegments[pathSegments.length - 1];

    // 좋아요 상태와 카운트 관리
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);
    
    // 드롭다운 메뉴 표시 상태 추가
    const [showDropdown, setShowDropdown] = useState(false);

    const  [isProjectDeleteModalOpen, setIsProjectDeleteModalOpen] = useState(false);
    
    // Log previousPath to the console
    useEffect(() => {
        console.log('Previous Path:', previousPath);
    }, [previousPath]); // Dependency array to log whenever previousPath changes

    // 드롭다운 외부 클릭 시 닫기 핸들러
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.dropdown-container')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // 서버에서 프로젝트 상세 정보 및 초기 좋아요 상태 가져오기
    useEffect(() => {
        if (projectId) { // accessToken이 없어도 조회할 수 있도록 수정
            const fetchData = async () => {
                try {
                    if (!accessToken) return;
                    const result = await GetProjectGalleryDetail(accessToken, parseInt(projectId, 10));
                    setData(result);
                    // 초기 좋아요 상태 및 카운트 설정
                    setIsLiked(result.like);
                    setLikeCount(result.likeCount);
                } catch (error) {
                    setError(error as Error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [projectId, accessToken]);  // accessToken 의존성 추가

    // 좋아요 토글 함수
    const toggleLike = async () => {
        if (!accessToken) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            const response = await ToggleProjectLike(accessToken, parseInt(projectId, 10), !isLiked);
            setIsLiked(response.like);
            setLikeCount(response.likeCount);
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div className="flex w-full flex-col justify-center items-center pt-[70px] bg-[#FFF]">
                <div className="flex flex-col items-center gap-[3.125rem] w-full max-w-[45.3125rem] mt-[4.21rem] px-4 sm:px-0">
                    <div className="flex flex-col items-start gap-[1rem] self-stretch">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex h-[1.8125rem] px-[0.75rem] py-[0.1875rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-[rgba(225,220,255,0.40)]">
                                <span className="text-[#776BFF] font-medium text-[0.813rem] sm:text-[0.875rem] leading-[1.3125rem]">
                                    {data?.projectTarget}
                                </span>
                            </div>
                            <span className="text-[#6A6F7A] font-medium text-[0.75rem] sm:text-[0.875rem] leading-[1.3125rem]">
                                작성일자  |  {data?.startDate}
                            </span>
                        </div>

                        <div className="flex justify-between items-start w-full">
                            <h1 className="text-[#0F1011] font-semibold text-xl sm:text-2xl leading-loose max-w-[80%]">
                                {data?.projectTitle}
                            </h1>

                            {data?.mine && isAuth && (
                                <div className="relative dropdown-container">
                                    <button 
                                        className="p-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowDropdown(!showDropdown);
                                        }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 5C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4C11 4.55228 11.4477 5 12 5Z" stroke="#6A6F7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#6A6F7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 21C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19C11.4477 19 11 19.4477 11 20C11 20.5523 11.4477 21 12 21Z" stroke="#6A6F7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                    {showDropdown && (
                                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                            <button 
                                                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                                onClick={() => {
                                                    // 수정 로직 추가
                                                    setShowDropdown(false);
                                                }}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#6A6F7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="#6A6F7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                수정하기
                                            </button>
                                            <button 
                                                className="w-full px-4 py-2 text-left text-[#776BFF] hover:bg-gray-100 flex items-center gap-2"
                                                onClick={() => setIsProjectDeleteModalOpen(true)}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 6H5H21" stroke="#776BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#776BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                삭제하기
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex h-6 px-3 items-center gap-1 rounded-sm bg-[#F4F6FA]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" viewBox="0 0 11 14" fill="none">
                                <path d="M9.50245 6.39985C9.32998 6.17489 9.12002 5.97993 8.92506 5.78496C8.42265 5.33505 7.85275 5.01261 7.37284 4.54019C6.25555 3.44539 6.00809 1.63822 6.72046 0.250977C6.00809 0.423445 5.38571 0.813374 4.8533 1.2408C2.91116 2.80051 2.1463 5.55251 3.06113 7.91457C3.09113 7.98956 3.12112 8.06455 3.12112 8.16203C3.12112 8.327 3.00864 8.47697 2.85867 8.53696C2.6862 8.61195 2.50623 8.56695 2.36376 8.44698C2.3212 8.41133 2.28561 8.3681 2.25878 8.3195C1.41143 7.2472 1.27646 5.70998 1.84635 4.4802C0.594084 5.50002 -0.0882913 7.2247 0.00919087 8.8519C0.0541826 9.22683 0.0991744 9.60176 0.226651 9.9767C0.331632 10.4266 0.534095 10.8765 0.759054 11.274C1.56891 12.5712 2.97115 13.5011 4.47837 13.6885C6.08308 13.891 7.80026 13.5985 9.03004 12.4887C10.4023 11.244 10.8822 9.24933 10.1773 7.53964L10.0798 7.34468C9.92238 6.99974 9.50245 6.39985 9.50245 6.39985ZM7.13289 11.124C6.92292 11.304 6.57799 11.4989 6.30804 11.5739C5.46819 11.8738 4.62835 11.4539 4.13344 10.959C5.02577 10.7491 5.55817 10.0892 5.71565 9.4218C5.84312 8.82191 5.60317 8.327 5.50568 7.7496C5.4157 7.19471 5.4307 6.72229 5.63316 6.20489C5.77563 6.48983 5.92561 6.77478 6.10557 6.99974C6.68297 7.7496 7.5903 8.07954 7.78527 9.09936C7.81526 9.20434 7.83026 9.30932 7.83026 9.4218C7.85275 10.0367 7.5828 10.7116 7.13289 11.124Z" fill="#776BFF"/>
                            </svg>
                            <span className="text-[#0F1011] font-pretendard font-bold text-xs sm:text-sm leading-[1.3125rem]">
                                {likeCount}
                            </span>
                        </div>
                    </div>

                    <div className="relative w-full rounded-sm overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        {data?.mainImagePath && (
                            <Image
                                src={data.mainImagePath}
                                alt={data.projectTitle}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-sm"
                            />
                        )}
                    </div>

                    <div className="flex items-start gap-[0.4375rem] flex-wrap">
                        {data?.tagList?.map((tag, index) => (
                            <div key={index} className="flex h-[2.4375rem] px-4 sm:px-5 justify-center items-center gap-2 rounded-full border border-[#AEA0FF] bg-[#FEFEFE] mb-2">
                                <span className="text-[#776BFF] font-pretendard font-medium text-xs sm:text-sm leading-[1.3125rem]">
                                    #{tag}
                                </span>
                            </div>
                        ))}
                    </div>

                    {data?.subtitleList?.map((subtitle, index) => (
                        <div key={index} className="self-stretch px-4 sm:px-0">
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">{subtitle}</h3>
                            <p className="text-sm sm:text-base text-[#4E525C] mb-4">{data?.contentList?.[index]}</p>
                        </div>
                    ))}

                    <div className="flex justify-center overflow-x-auto gap-2 pb-2 w-full px-4 sm:px-0">
                        {data?.projectImageList?.map((image, index) => (
                            <div key={index} className="relative min-w-[180px] h-[180px] sm:min-w-[200px] sm:h-[200px] flex-shrink-0">
                                <Image
                                    src={image}
                                    alt={`Project Image ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-md"
                                />
                            </div>
                        ))}
                    </div>

                    <CheerButton
                        isLiked={isLiked}
                        likeCount={likeCount}
                        onToggleLike={toggleLike}
                    />

                    <div className="flex flex-col items-start gap-[1.25rem] w-full">
                        <div className="flex flex-col w-full p-4 items-start gap-[0.875rem] rounded-xl border border-[#E2E6EF] bg-[#FEFEFE]">
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex items-end gap-2">
                                    <Image
                                        src={data?.memberImage || '/assets/icons/my_profile_icon.svg'}
                                        alt="기본 프로필"
                                        width={44}
                                        height={44}
                                        objectFit="contain"
                                        className="rounded-full"
                                    />
                                    <div className="flex flex-col items-start">
                                        <span className="text-[#6A6F7A] font-pretendard text-xs sm:text-sm font-normal leading-[1.125rem]">
                                            제안자
                                        </span>
                                        <span className="text-[#0F1011] font-pretendard text-sm sm:text-base font-medium leading-[1.5rem]">
                                            {data?.memberName}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <span className="text-[#4E525C] font-pretendard text-xs sm:text-sm font-normal">
                                        e-mail: {data?.memberEmail}
                                    </span>
                                </div>
                            </div>
                            <span className="self-stretch text-[#0F1011] font-pretendard text-sm sm:text-base font-medium leading-[1.5rem]">
                                {data?.memberIntro}
                            </span>
                        </div>
                    </div>

                    <div className="self-stretch h-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="725" height="2" viewBox="0 0 725 2" fill="none">
                            <path d="M725 1H0" stroke="#E2E6EF" strokeWidth="1" />
                        </svg>
                    </div>

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

                    <div className="flex flex-col items-center gap-[2.125rem] self-stretch mb-[3.5rem]">
                        <button
                            onClick={() => router.push(previousPath)}
                            className="flex h-[3.5rem] min-w-[6rem] px-[1.75rem] py-[1.125rem] justify-center items-center gap-[0.625rem] rounded-[0.5rem] bg-[#F4F6FA]">
                            <span className="text-center text-[#4E525C] font-pretendard text-[1.125rem] font-medium leading-[1.6875rem]">
                                목록으로 돌아가기
                            </span>
                        </button>
                    </div>
                </div>
                <ProjectDeleteModal 
                    isOpen={isProjectDeleteModalOpen} 
                    onClose={() => setIsProjectDeleteModalOpen(false)} 
                    projectId={parseInt(projectId, 10)}
                    previousPath={previousPath}
                />
            </div>
            <Footer />
        </>
    )
}