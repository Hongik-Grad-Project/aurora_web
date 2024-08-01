'use client'

import Input from "@/components/common/Input"

interface ProfileEditProps {
    isOpen: boolean
    onClose: () => void
}

export default function ProfileEdit({ isOpen, onClose }: ProfileEditProps) {

    if (!isOpen) return null

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }
    
    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000] bg-opacity-40"
            onClick={handleBackgroundClick}
        >
            <div className="flex w-[55.875rem] p-[1.25rem] flex-col items-start gap-[1.3125rem] flex-shrink-0 rounded-[1rem] bg-[#FFF]">
                <span
                className="text-[#1E2A3B] text-[1.25rem] font-bold leading-[1.6875rem]"
                >
                    프로필 수정
                </span>
                <div className="flex justify-center items-center gap-[1.9375rem] self-stretch">
                    <div className="flex p-[1.25rem] flex-col justify-between items-start self-stretch rounded-[1rem] bg-[#F8F9FC]">
                        <div className="flex flex-col items-start gap-[1.1875rem]">
                            <div className="flex flex-col items-start gap-[0.5rem]">
                                <span
                                className="text-[#0F1A2A] text-[1rem] font-medium leading-[1.5rem]"
                                >
                                    프로필 이미지
                                </span>
                                <span
                                  className="text-[#6A6F7A] text-[0.875rem] font-normal leading-[1.375rem]"
                                >
                                    추천 사이즈: 512 x 512 px / JPG, PNG, 최대 2MB
                                </span>
                            </div>
                        </div>
                        <div className="flex items-end gap-[4.9375rem]">
                            <div className="flex w-[7.79256rem] h-[7.79256rem] p-[2.62569rem] pt-[2.66688rem] pr-[2.64456rem] pl-[2.648rem] justify-center items-center rounded-[12.5rem] bg-[#E2E6EF]">
                                <img src="/assets/icons/camera.svg" alt="Description of image" className="w-[2.5rem] h-[2.5rem]" />
                            </div>
                            <button className="flex h-[2.8125rem] py-[0.25rem] px-[0.875rem] items-center gap-[0.4375rem] rounded-[0.3125rem] bg-[#776BFF]">
                                <span
                                    className="text-white text-center text-[0.875rem] font-medium leading-[1.375rem]"
                                > 
                                이미지 업로드
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-[1.1875rem]">
                        <div className="flex flex-col items-start gap-2">
                            <span
                                className="text-[#1E2A3B] text-[0.875rem] font-semibold leading-[1.375rem]"
                            >
                                이름
                            </span>
                            <div className="flex w-[25.375rem] h-[2.75rem] py-[0.625rem] px-[0.875rem] justify-between items-center rounded-[0.4375rem] border border-[#64748B]">
                                <span
                                className="text-[#1E2A3B] text-[1rem] font-medium leading-[1.5rem]"
                                >
                                    김 |
                                </span>
                            <div className="flex p-[0.3125rem] items-start gap-[0.625rem] rounded-[12.5rem] bg-[#CBD4E1]">                      
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-[0.375rem] h-[0.375rem]"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                    >
                                    <path
                                        d="M0.839844 1L6.83984 7"
                                        stroke="white"
                                        strokeWidth="0.923077"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M6.83984 1L0.839844 7"
                                        stroke="white"
                                        strokeWidth="0.923077"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                            </div>  

                            </div>
                            <Input />
                            <Input />
                        </div>
                </div>
                <div className="flex h-[3.5rem] pl-[45.9375rem] justify-end items-center w-full">
                    <button className="flex h-[3.5rem] min-w-[6rem] py-[1.125rem] px-[1.75rem] justify-center items-center gap-[0.625rem] rounded-[0.5rem] bg-[#776BFF]">
                        <span
                            className="text-[#FEFEFE] text-center text-[1.125rem] font-medium leading-[1.6875rem]"
                        >
                            수정완료
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}