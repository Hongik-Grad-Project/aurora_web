'use client'

import { useState, useEffect } from 'react'
import { useForm, SubmitHandler, useWatch } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import ProjectBodyText from '@/components/Project/ProjectBodyText'
import ProjectImage from '@/components/Project/ProjectImage'
import { PostProjectBodyData, RegisterProject } from '@/lib/action'
import { pushNotification } from '@/components/common/component/ToastPopUp/ToastPopUp'

interface FormInputs {
    tagInput: string
    textSections: { subtitle: string; content: string }[]
    imageFiles: File[]
}

export default function ProjectBodyPage() {
    const router = useRouter()
    const pathname = usePathname()
    const { register, watch, handleSubmit, setValue, formState: { isValid } } = useForm<FormInputs>({
        mode: 'onChange',
        defaultValues: {
            tagInput: ''
        }
    })
    const accessToken = useRecoilValue(accessTokenState);

    const [textSections, setTextSections] = useState([{ subtitle: '', content: '' }])
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([])

    const pathSegments = pathname.split('/');
    const projectId = pathSegments[pathSegments.length - 1];

    useEffect(() => {
        setValue('tagInput', tags.join(', '));
        setValue('textSections', textSections);
        setValue('imageFiles', imageFiles);
    }, [tags, textSections, imageFiles, setValue]);

    // 조건 충족 여부 확인 함수
    const areTextSectionsValid = textSections.some(section => section.subtitle.trim() !== '' && section.content.trim() !== '');
    const isTagsValid = tags.length > 0;

    // 전체 유효성 확인 (이미지 조건 제거)
    const canSubmit = areTextSectionsValid && isTagsValid;

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

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];
            if (file.size > 1024 * 1024 * 2) {
                alert('파일 크기가 2MB를 초과할 수 없습니다.');
                return;
            }

            const updatedFiles = [...imageFiles];
            const updatedPreviews = [...imagePreviews];

            updatedFiles[index] = file;

            const reader = new FileReader();
            reader.onloadend = () => {
                updatedPreviews[index] = URL.createObjectURL(file);
                setImagePreviews(updatedPreviews);
                setImageFiles(updatedFiles);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTextChange = (index: number, subtitle: string, content: string) => {
        const updatedTexts = [...textSections];
        updatedTexts[index] = { subtitle, content };
        setTextSections(updatedTexts);
    }

    const handleTagInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 폼 제출 방지
            const input = event.target as HTMLInputElement;
            const newTag = input.value.trim();

            if (newTag && !tags.includes(newTag) && tags.length < 10) {
                setTags((prevTags) => {
                    const updatedTags = [...prevTags, newTag];
                    setValue('tagInput', updatedTags.join(', ')); // 폼 값 업데이트
                    return updatedTags;
                });
            }

            input.value = '';
        }
    };

    const removeTag = (index: number) => {
        setTags(prev => prev.filter((_, i) => i !== index)); // Remove tag by index
    };

    // 텍스트 섹션 삭제
    const removeTextSection = (index: number) => {
        console.log(`Removing text section at index ${index}`); // 로그 출력
        const updatedSections = textSections.filter((_, idx) => idx !== index);
        setTextSections(updatedSections);
    };

    const removeImageSection = (index: number) => {
        const newFiles = imageFiles.filter((_, i) => i !== index);
        setImageFiles(newFiles);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setImagePreviews(newPreviews);
    };

    // 프로젝트 저장 API 호출
    const onSaveProject: SubmitHandler<FormInputs> = async () => {
        if (!accessToken) return;

        const payload = {
            subtitleList: textSections.map((section) => section.subtitle), // 소제목 배열
            contentList: textSections.map((section) => section.content),  // 내용 배열
            tagList: tags,  // 태그 배열
        };

        try {
            const response = await PostProjectBodyData(accessToken, projectId, payload, imageFiles);
            pushNotification('임시저장되었습니다', 'success'); // 성공 알림
        } catch (error) {
            pushNotification('임시저장에 실패했습니다', 'error'); // 오류 알림
        }
    };

    const onSubmit: SubmitHandler<FormInputs> = async () => {
        if (!accessToken) return;

        const payload = {
            subtitleList: textSections.map((section) => section.subtitle),
            contentList: textSections.map((section) => section.content),
            tagList: tags,
        };

        try {
            const response = await RegisterProject(accessToken, projectId, payload, imageFiles);
            router.push(`/project/gallery`);
        } catch (error) {
            console.error('프로젝트 등록 오류:', error);
        }
    };

    return (
        <div className="flex w-full flex-col justify-center items-center pt-[40px] md:pt-[70px]">
            <form className="flex flex-col items-start gap-4 md:gap-[0.9375rem] w-full max-w-[62.5rem] px-4 md:px-0 pt-[1.5rem] md:pt-[2.94rem] pb-[6rem] md:pb-[12rem]">
                {/* 헤더 부분 */}
                <div className="flex w-full items-center gap-3 md:gap-[1.75rem]">
                    <div className="text-[#9DA1AD] font-medium text-xl md:text-[2.5rem] leading-normal md:leading-[3.75rem] opacity-80">
                        프로젝트 개요
                    </div>
                    <div className="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 12 20" fill="none" className="w-[0.5rem] h-[1rem] opacity-80 md:w-3 md:h-5">
                            <path d="M2 2L10 10L2 18" stroke="#9DA1AD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-[#0F1011] font-bold text-xl md:text-[2.5rem] leading-normal md:leading-[3.75rem]">
                        본문 작성
                    </div>
                </div>

                {/* 메인 컨텐츠 */}
                <div className="flex flex-col items-start gap-4 md:gap-[1.25rem] w-full">
                    <div className="flex flex-col justify-center items-center gap-4 md:gap-[1.1875rem] w-full p-4 md:p-[1.875rem] rounded-[1rem] bg-[#FEFEFE]">
                        {/* ProjectBodyText 컴포넌트 */}
                        {textSections.map((section, index) => (
                            <ProjectBodyText
                                key={index}
                                index={index}
                                onChange={handleTextChange}
                                onRemove={() => removeTextSection(index)}
                                className="w-full"
                            />
                        ))}

                        {/* 이미지 섹션 */}
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-x-5 w-full">
                            {imageFiles.map((file, index) => (
                                <div key={index} className="w-full md:w-auto">
                                    <ProjectImage
                                        onFileChange={(file) => handleImageUpload({ target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>, index)}
                                        onRemove={() => removeImageSection(index)}
                                        preview={imagePreviews[index]}
                                    />
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

                        {/* 태그 입력 섹션 */}
                        <div className="w-full">
                            <div className="flex flex-col items-start gap-0.5 md:gap-[0.5rem] w-full">
                                <div className="text-[#0F1011] font-pretendard text-xs md:text-[1.25rem] font-bold leading-tight md:leading-[1.875rem]">
                                    태그 등록
                                </div>
                                <div className="flex flex-wrap items-center w-full gap-0.5 md:gap-[0.625rem] rounded-[0.4375rem] border border-[#E2E6EF] bg-[#F8F9FC] p-1.5 md:p-[0.625rem]">
                                    {tags.map((tag, index) => (
                                        <div key={index} className="flex items-center gap-1 bg-[#776BFF] rounded px-1.5 py-0.5 text-white text-xs md:text-base">
                                            <span>#{tag}</span>
                                            <button type="button" onClick={() => removeTag(index)}>x</button>
                                        </div>
                                    ))}
                                    <input
                                        type="text"
                                        placeholder="#태그 입력 (최대 10개)"
                                        className="flex-1 p-1.5 bg-transparent outline-none text-xs md:text-base"
                                        onKeyPress={handleTagInput}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 버튼 섹션 */}
                        <div className="flex justify-end items-center w-full mt-4 md:mt-6">
                            <button
                                type="button"
                                onClick={handleSubmit(onSaveProject)}
                                className="flex h-10 md:h-[3.5rem] px-4 md:px-[1.75rem] py-2 md:py-[1.125rem] justify-center items-center rounded-[0.5rem] bg-[#776BFF]"
                            >
                                <span className="text-white text-sm md:text-[1.125rem] font-medium">
                                    저장
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* 등록 버튼 */}
                    <button
                        type="submit"
                        disabled={!canSubmit}
                        onClick={handleSubmit(onSubmit)}
                        className={`w-full md:w-auto h-10 md:h-[3.5rem] px-4 md:px-[1.75rem] py-2 md:py-[1.125rem] justify-center items-center rounded-[0.5rem] ${canSubmit ? 'bg-[#776BFF]' : 'bg-[#E2E6EF] cursor-not-allowed'}`}
                    >
                        <span className={`text-sm md:text-[1.125rem] font-medium ${canSubmit ? 'text-white' : 'text-[#9DA1AD]'}`}>
                            프로젝트 등록하기
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
}