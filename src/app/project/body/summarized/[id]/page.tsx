'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import ProjectBodyText from '@/components/Project/ProjectBodyText'
import ProjectImage from '@/components/Project/ProjectImage'
import { EditProjectBodyData, PostProjectBodyData, RegisterProject } from '@/lib/action'

interface FormInputs { }

export default function SummarizedProjectBodyPage() {
    const router = useRouter()
    const pathname = usePathname()
    const { handleSubmit } = useForm<FormInputs>()
    const accessToken = useRecoilValue(accessTokenState) || ''

    const [textSections, setTextSections] = useState<{ subtitle: string; content: string }[]>([{ subtitle: '', content: '' }])
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])

    const pathSegments = pathname.split('/');
    const projectId = pathSegments[pathSegments.length - 1];

    const addTextSection = () => {
        if (textSections.length < 3) {
            setTextSections([...textSections, { subtitle: '', content: '' }])
        }
    }

    const addImageSection = () => {
        if (imageFiles.length < 3) {
            setImageFiles([...imageFiles, new File([], '')])
        }
    }

    // 여러 개의 이미지를 업로드하고 미리보기를 제공하는 함수
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];
            
            if (file.size > 1024 * 1024 * 2) { // 2MB 크기 제한
                alert('파일 크기가 2MB를 초과할 수 없습니다.');
                return;
            }

            // 파일을 추가 및 미리보기 업데이트
            const updatedFiles = [...imageFiles];
            const updatedPreviews = [...imagePreviews];

            updatedFiles[index] = file;

            const reader = new FileReader();
            reader.onloadend = () => {
                updatedPreviews[index] = URL.createObjectURL(file);
                setImagePreviews(updatedPreviews); // 미리보기 업데이트
                setImageFiles(updatedFiles); // 파일 업데이트
            };

            reader.readAsDataURL(file);
        }
    };

    const handleTextChange = (index: number, subtitle: string, content: string) => {
        const updatedTexts = [...textSections];
        updatedTexts[index] = { subtitle, content };
        setTextSections(updatedTexts);
    }

    // 프로젝트 저장 API 호출
    const onSaveProject: SubmitHandler<FormInputs> = async () => {
        if (!accessToken) return;

        const payload = {
            subtitleList: textSections.map((section) => section.subtitle), // 소제목 배열
            contentList: textSections.map((section) => section.content),  // 내용 배열
            tagList: ["태그1", "태그2", "태그3"],  // 임시 태그 배열
        };

        try {
            const response = await EditProjectBodyData(accessToken, projectId, payload, imageFiles);  // projectId를 실제로 교체
            console.log("프로젝트가 저장되었습니다.");
        } catch (error) {
            console.error('프로젝트 저장 오류:', error);
        }
    };

    // 프로젝트 등록 API 호출
    const onRegisterProject: SubmitHandler<FormInputs> = async () => {
        if (!accessToken) return;

        const payload = {
            subtitleList: textSections.map((section) => section.subtitle), // 소제목 배열
            contentList: textSections.map((section) => section.content),  // 내용 배열
            tagList: ["태그1", "태그2", "태그3"],  // 임시 태그 배열
        };

        try {
            const response = await RegisterProject(accessToken, projectId, payload, imageFiles);  // projectId를 실제로 교체
            router.push('/project/gallery');  // 성공 시 이동할 경로
        } catch (error) {
            console.error('프로젝트 등록 오류:', error);
        }
    };

    return (
        <div className="flex w-full flex-col justify-center items-center pt-[70px]">
            <form className="flex flex-col items-start gap-[0.9375rem] pt-[2.94rem] pb-[12rem]">
                <div className="flex w-[62.5rem] items-center gap-[1.75rem]">
                    <div className="text-[#9DA1AD] font-medium text-[2.5rem] leading-[3.75rem] opacity-80">
                        프로젝트 개요
                    </div>
                    <div className="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none" className="w-[0.5rem] h-[1rem] opacity-80">
                            <path d="M2 2L10 10L2 18" stroke="#9DA1AD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="fill-[#E2E6EF] stroke-[#9DA1AD]" />
                        </svg>
                    </div>
                    <div className="text-[#0F1011] font-bold text-[2.5rem] leading-[3.75rem]">
                        본문 작성
                    </div>
                </div>

                <div className="flex flex-col items-start gap-[1.25rem] self-stretch">
                    <div className="flex flex-col justify-center items-center gap-[1.1875rem] self-stretch p-[1.875rem] rounded-[1rem] bg-[#FEFEFE]">
                        {/* 본문 텍스트 입력 부분 */}
                        {textSections.map((section, index) => (
                            <ProjectBodyText
                                key={index}
                                index={index}
                                onChange={(index, subtitle, content) => handleTextChange(index, subtitle, content)}  // 인덱스를 함께 전달
                            />
                        ))}

                        {/* 이미지 입력 부분 */}
                        <div className="flex flex-row justify-center items-center gap-x-5">
                            {imageFiles.map((_, index) => (
                                <div key={index}>
                                    <ProjectImage
                                        onFileChange={(file: File) => handleImageUpload({ target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>, index)}
                                    />
                                    {/* 이미지 미리보기 표시 */}
                                    {imagePreviews[index] && (
                                        <Image
                                            src={imagePreviews[index]}
                                            alt={`이미지 미리보기 ${index + 1}`}
                                            width={100}
                                            height={100}
                                            className="rounded-md"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* 세트 추가 버튼 */}
                        <div className="flex items-start gap-[1rem] self-stretch">
                            <button type="button" className="w-[4.3125rem] h-[6.125rem]" onClick={addTextSection}>
                                <Image src="/assets/icons/add_section_button.svg" alt="Add Section" width={69} height={98} />
                            </button>
                            <button type="button" className="w-[4.3125rem] h-[6.125rem]" onClick={addImageSection}>
                                <Image src="/assets/icons/add_image_button.svg" alt="Add Image" width={69} height={98} />
                            </button>
                        </div>

                        {/* 태그 입력 */}
                        <div className="flex flex-col items-start gap-[1rem] self-stretch">
                            <div className="self-stretch text-[#0F1011] font-pretendard text-[1.25rem] font-bold leading-[1.875rem]">
                                태그 등록
                            </div>
                            <div className="flex flex-col items-start gap-[0.5rem] self-stretch">
                                후원자들이 프로젝트를 쉽게 검색할 수 있도록 프로젝트와 관련된 검색 키워드를 입력해주세요! (최대 10개)
                                <div className="flex h-[2.75rem] px-[0.875rem] pr-[15.5625rem] py-[0.625rem] items-center gap-[0.625rem] self-stretch rounded-[0.4375rem] border border-[#E2E6EF] bg-[#F8F9FC]">
                                    <input
                                        type="text"
                                        placeholder="프로젝트의 태그를 입력하고 엔터해주세요"
                                        className="flex-grow bg-transparent text-[#0F1011] outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 저장 버튼 */}
                        <div className="flex justify-end items-center self-stretch pl-[44.25rem]">
                            <div className="flex items-start gap-[0.625rem]">
                                <button 
                                    type="button" // submit 대신 button으로 변경
                                    onClick={handleSubmit(onSaveProject)} // 프로젝트 저장 함수 호출
                                    className="flex w-[6.9375rem] h-[3.5rem] min-w-[6rem] px-[1.75rem] py-[1.125rem] justify-center items-center gap-[0.625rem] rounded-[0.5rem] bg-[#776BFF]"
                                >
                                    <span className="text-[#FEFEFE] text-center font-medium text-[1.125rem] leading-[1.6875rem]">
                                        저장
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <button 
                        type="button" // submit 대신 button으로 변경
                        onClick={handleSubmit(onRegisterProject)} // 프로젝트 등록 함수 호출
                        className="flex h-[3.5rem] min-w-[6rem] px-[1.75rem] py-[1.125rem] justify-center items-center gap-[0.625rem] rounded-[0.5rem] bg-[#776BFF]"
                    >
                        <span className="text-[#FEFEFE] text-center font-medium text-[1.125rem] leading-[1.6875rem]">
                            프로젝트 등록하기
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
}
