'use client'

import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '@/context/recoil-context';
import ProfileEdit from './ProfileEdit';

interface MyProfileProps {
    profileData: {
        nickname: string;
        profileImage: string | null;
        email: string;
        introduction: string;
    } | null;
}

export default function MyProfile({ profileData }: MyProfileProps) {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);

    // 기본 프로필 이미지 URL
    const defaultProfileImage = "/assets/icons/user_basic_profile.svg";

    return (
        <>
            <div className="flex flex-col items-start gap-[1.25rem] self-stretch">
                <h2 className="text-black text-[2.5rem] font-bold leading-[3.75rem] self-stretch mb-[1.25rem]">
                    마이 페이지
                </h2>
                <div className="flex flex-col items-start gap-[0.875rem] p-[1rem] self-stretch rounded-[1rem] border border-[#E2E6EF] bg-[#FEFEFE]">
                    <div className="flex flex-col mb-[0.88rem]">
                        <div className="flex flex-row mb-[1.06rem]">
                            <div
                                className="w-[4.1875rem] h-[4.1875rem] mr-[0.5rem] rounded-[50%]"
                                style={{
                                    background: '#FFFFFF',
                                    backgroundImage: `url(${profileData?.profileImage || defaultProfileImage})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                {/* 빈 이미지 태그로 백그라운드 이미지 적용 */}
                                <img src={defaultProfileImage} alt="background" className="invisible w-[4.1875rem] h-[4.1875rem]" />
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="w-full text-[#6A6F7A] text-[1rem] font-medium leading-[1.5rem] mt-[0.41rem]">
                                    제안자
                                </div>
                                <div className="w-full text-[#0F1011] text-[1.25rem] font-bold leading-[1.875rem]">
                                    {profileData?.nickname || '사용자 이름'}
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full max-w-[12rem] p-[0.1875rem] px-[0.6875rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-[#F9F8FF]">
                            <div className="text-[#4E525C] text-[0.75rem] font-normal leading-[1.125rem] tracking-[-0.0165rem] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                                e-mail: {profileData?.email || '이메일 정보 없음'}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-[0.875rem] self-stretch">
                        <div className="text-[#0F1011] text-[1rem] font-medium leading-[1.5rem]">
                            {profileData?.introduction || '한 줄 소개를 입력해주세요.'}
                        </div>
                        <div className="flex h-[2.8125rem] pl-[21.0625rem] justify-end items-center flex-[1_0_0]">
                            <button
                                onClick={() => setIsProfileEditModalOpen(true)}
                                className="flex h-[2.8125rem] px-[1.6875rem] py-[0.1875rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-[#F0F0F0]"
                            >
                                <span className="text-[#4E525C] text-[1rem] font-medium leading-[1.5rem]">
                                    프로필 수정하기
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ProfileEdit 모달을 호출하여 화면에 출력 */}
            {isProfileEditModalOpen && (
                <ProfileEdit
                    isOpen={isProfileEditModalOpen}
                    onClose={() => setIsProfileEditModalOpen(false)}
                    profileData={profileData}
                    accessToken={accessToken}
                />
            )}
        </>
    )
}
