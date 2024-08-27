'use client'

import { useState } from 'react';
import Image from 'next/image';
import Input from "@/components/common/Input";
import { UpdateMyPage } from '@/lib/action';

interface ProfileEditProps {
    isOpen: boolean;
    onClose: () => void;
    profileData: {
        nickname: string;
        email: string;
        introduction: string;
    } | null;
    accessToken: string; // Pass accessToken from parent component
}

export default function ProfileEdit({ isOpen, onClose, profileData, accessToken }: ProfileEditProps) {
    // State for inputs and file
    const [nickname, setNickname] = useState(profileData?.nickname || '');
    const [introduction, setIntroduction] = useState(profileData?.introduction || '');
    const [profileImage, setProfileImage] = useState<File | null>(null);

    // Handle file input change
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setProfileImage(event.target.files[0]);
        }
    };
    
    // Handle profile update
    const handleUpdateProfile = async () => {
        const payload = {
            nickname,
            introduction
        };
        const response = await UpdateMyPage(accessToken, payload, profileImage);
        if (response.ok) {
            window.location.reload();  // Reload the page upon successful update
        }
    };

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    // Guard clause moved after hook declarations to maintain correct hook order
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000] bg-opacity-40"
            onClick={handleBackgroundClick}
        >
            <div className="flex w-[55.875rem] p-[1.25rem] flex-col items-start gap-[1.3125rem] flex-shrink-0 rounded-[1rem] bg-[#FFF]">
                <span className="text-[#1E2A3B] text-[1.25rem] font-bold leading-[1.6875rem]">
                    프로필 수정
                </span>
                <div className="flex justify-center items-center gap-[1.9375rem] self-stretch">
                    <div className="flex p-[1.25rem] flex-col justify-between items-start self-stretch rounded-[1rem] bg-[#F8F9FC]">
                        <div className="flex flex-col items-start gap-[1.1875rem]">
                            <div className="flex flex-col items-start gap-[0.5rem]">
                                <span className="text-[#0F1A2A] text-[1rem] font-medium leading-[1.5rem]">
                                    프로필 이미지
                                </span>
                                <span className="text-[#6A6F7A] text-[0.875rem] font-normal leading-[1.375rem]">
                                    추천 사이즈: 512 x 512 px / JPG, PNG, 최대 2MB
                                </span>
                            </div>
                        </div>
                        <div className="flex items-end gap-[4.9375rem]">
                            <div className="flex w-[7.79256rem] h-[7.79256rem] p-[2.62569rem] pt-[2.66688rem] pr-[2.64456rem] pl-[2.648rem] justify-center items-center rounded-[12.5rem] bg-[#E2E6EF]">
                                <Image src="/assets/icons/camera.svg" alt="프로필 이미지 업로드" width={40} height={40} className="w-[2.5rem] h-[2.5rem]" />
                            </div>
                            <button className="flex h-[2.8125rem] py-[0.25rem] px-[0.875rem] items-center gap-[0.4375rem] rounded-[0.3125rem] bg-[#776BFF]">
                                <span className="text-white text-center text-[0.875rem] font-medium leading-[1.375rem]">
                                    이미지 업로드
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-[1.1875rem]">
                        <Input label="이름" placeholder="이름을 입력하세요" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                        <Input label="이메일" placeholder="변경 불가" value={profileData?.email} readOnly={true} />
                        <Input label="자기소개" placeholder="자기소개를 입력하세요" value={introduction} onChange={(e) => setIntroduction(e.target.value)} />
                    </div>
                </div>
                <div className="flex h-[3.5rem] pl-[45.9375rem] justify-end items-center w-full">
                    <button onClick={handleUpdateProfile} className="flex h-[3.5rem] min-w-[6rem] py-[1.125rem] px-[1.75rem] justify-center items-center gap-[0.625rem] rounded-[0.5rem] bg-[#776BFF]">
                        <span className="text-[#FEFEFE] text-center text-[1.125rem] font-medium leading-[1.6875rem]">
                            수정완료
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
