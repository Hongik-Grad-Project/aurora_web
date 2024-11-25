'use client'

import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '@/context/recoil-context';
import ProfileEdit from './ProfileEdit';
import Image from 'next/image';

interface MyProfileProps {
    profileData: {
        nickname: string;
        profileImage: string | null;
        email: string;
        introduction: string;
    } | null;
}

export default function MyProfile({ profileData }: MyProfileProps) {
    const accessToken = useRecoilValue(accessTokenState);
    const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
    const defaultProfileImage = "/assets/icons/user_basic_profile.svg";

    return (
        <>
            <div className="flex flex-col items-start gap-[1.25rem] self-stretch">
                <h2 className="text-[1.75rem] sm:text-[2.5rem] font-bold leading-[2.5rem] sm:leading-[3.75rem] self-stretch mb-[1.25rem]">
                    마이 페이지
                </h2>
                <div className="flex flex-col items-start gap-[0.875rem] p-[1rem] self-stretch rounded-[1rem] border border-[#E2E6EF] bg-[#FEFEFE]">
                    <div className="flex flex-col w-full mb-[0.88rem]">
                        <div className="flex flex-row mb-[1.06rem]">
                            <div
                                className="w-[3.5rem] h-[3.5rem] sm:w-[4.1875rem] sm:h-[4.1875rem] mr-[0.5rem] rounded-[50%]"
                                style={{
                                    background: '#FFFFFF',
                                    backgroundImage: `url(${profileData?.profileImage || defaultProfileImage})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <Image 
                                    src={defaultProfileImage}
                                    alt="background"
                                    className="invisible"
                                    width={66}
                                    height={66}
                                />
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="text-[#6A6F7A] text-[0.875rem] sm:text-[1rem] font-medium leading-[1.5rem] mt-[0.41rem]">
                                    제안자
                                </div>
                                <div className="text-[#0F1011] text-[1.125rem] sm:text-[1.25rem] font-bold leading-[1.875rem]">
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[0.875rem] self-stretch">
                        <div className="text-[#0F1011] text-[0.875rem] sm:text-[1rem] font-medium leading-[1.5rem]">
                            {profileData?.introduction || '한 줄 소개를 입력해주세요.'}
                        </div>
                        <div className="flex w-full sm:w-auto sm:h-[2.8125rem] justify-end items-center sm:flex-[1_0_0]">
                            <button
                                onClick={() => setIsProfileEditModalOpen(true)}
                                className="flex h-[2.5rem] sm:h-[2.8125rem] min-w-[8rem] px-[1.6875rem] py-[0.1875rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-[#F0F0F0]"
                            >
                                <span className="text-[#4E525C] text-[0.875rem] sm:text-[1rem] font-medium leading-[1.5rem] whitespace-nowrap">
                                    프로필 수정하기
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isProfileEditModalOpen && accessToken && (
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
