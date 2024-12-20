'use client'

import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { accessTokenState, subTitleListState, contentListState } from '@/context/recoil-context'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import ProjectBodyText from '@/components/Project/ProjectBodyText'
import ProjectImage from '@/components/Project/ProjectImage'
import { EditProjectBodyData, RegisterProject } from '@/lib/action'
import { pushNotification } from '@/components/common/component/ToastPopUp/ToastPopUp'

interface FormInputs {
    tagInput: string; // Adjusted to handle live input
}

export default function SummarizedProjectBodyPage() {
    const router = useRouter()
    const pathname = usePathname()
    const { register, handleSubmit, setValue } = useForm<FormInputs>({
        defaultValues: {
            tagInput: ''
        }
    });
    const accessToken = useRecoilValue(accessTokenState);

    const subTitleList = useRecoilValue(subTitleListState);
    const contentList = useRecoilValue(contentListState);

    const [textSections, setTextSections] = useState<{ subtitle: string; content: string }[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([])

    const pathSegments = pathname.split('/');
    const projectId = pathSegments[pathSegments.length - 1];

    // textSections를 전역 상태에서 가져온 값으로 초기화
    useEffect(() => {
        if (subTitleList.length > 0 && contentList.length > 0) {
            const initialSections = subTitleList.map((subtitle, index) => ({
                subtitle,
                content: contentList[index] || '',
            }));
            setTextSections(initialSections);
            setValue('tagInput', tags.join(', '));
        } else {
            setTextSections([{ subtitle: '', content: '' }]);
            setValue('tagInput', tags.join(', '));
        }
    }, [subTitleList, contentList, setValue, tags]);

    // 조건 충족 여부 확인 함수
    const areTextSectionsValid = textSections.some(section => section.subtitle.trim() !== '' && section.content.trim() !== '');
    const isTagsValid = tags.length > 0;

    const canSubmit = areTextSectionsValid && isTagsValid;

    const addImageSection = () => {
        if (imageFiles.length < 3) {
            setImageFiles([...imageFiles, new File([], '')])
        }
    }

    const removeTag = (index: number) => {
        setTags(prev => prev.filter((_, i) => i !== index)); // Remove tag by index
    };

    const addTextSection = () => {
        if (textSections.length < 3) {
            setTextSections([...textSections, { subtitle: '', content: '' }])
        }
    }

    // 텍스트 섹션 삭제
    const removeTextSection = (index: number) => {
        console.log(`Removing text section at index ${index}`); // 로그 출력
        const updatedSections = textSections.filter((_, idx) => idx !== index);
        setTextSections(updatedSections);
    };

    const removeImageSection = (index: number) => {
        const updatedFiles = imageFiles.filter((_, idx) => idx !== index);
        setImageFiles(updatedFiles);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];

            if (file.size > 1024 * 1024 * 2) { // 2MB 크기 제한
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

    const onSaveProject: SubmitHandler<FormInputs> = async () => {
        if (!accessToken) return;

        const payload = {
            subtitleList: textSections.map((section) => section.subtitle),
            contentList: textSections.map((section) => section.content),
            tagList: tags,
        };

        try {
            await EditProjectBodyData(accessToken, projectId, payload, imageFiles);
            pushNotification('임시저장되었습니다.', 'success'); // 성공 알림
        } catch (error) {
            pushNotification('프로젝트 저장 오류', 'error'); // 오류 알림
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
            await RegisterProject(accessToken, projectId, payload, imageFiles);
            router.push(`/project/gallery`);
        } catch (error) {
            console.error('프로젝트 등록 오류:', error);
        }
    };

    return (
        <div className="flex w-full flex-col justify-center items-center pt-[30px] md:pt-[70px]">
            <form className="flex flex-col items-start gap-3 md:gap-[0.9375rem] w-full max-w-[62.5rem] px-4 md:px-0 pt-4 md:pt-[2.94rem] pb-[6rem] md:pb-[12rem]">
                <div className="flex w-full items-center gap-2 md:gap-[1.75rem]">
                    <div className="text-[#9DA1AD] font-medium text-lg md:text-[2.5rem] leading-normal md:leading-[3.75rem] opacity-80">
                        프로젝트 개요
                    </div>
                    <div className="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 12 20" fill="none" className="w-[0.3rem] h-[0.6rem] md:w-[0.5rem] md:h-[1rem] opacity-80">
                            <path d="M2 2L10 10L2 18" stroke="#9DA1AD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-[#0F1011] font-bold text-lg md:text-[2.5rem] leading-normal md:leading-[3.75rem]">
                        본문 작성
                    </div>
                </div>

                <div className="flex flex-col items-start gap-3 md:gap-[1.25rem] w-full">
                    <div className="flex flex-col justify-center items-center gap-3 md:gap-[1.1875rem] w-full p-3 md:p-[1.875rem] rounded-[1rem] bg-[#FEFEFE]">
                        {/* 프로젝트 본문 텍스트 입력 */}
                        {textSections.map((section, index) => (
                            <ProjectBodyText
                                key={index}
                                index={index}
                                subtitle={section.subtitle}
                                content={section.content}
                                onChange={handleTextChange}
                                onRemove={() => removeTextSection(index)} // 여기서 onRemove를 전달
                            />
                        ))}

                        {/* 이미지 입력 부분 */}
                        <div className="flex flex-row justify-center items-center gap-x-5">
                            {imageFiles.map((file, index) => (
                                <div key={index}>
                                    <ProjectImage
                                        onFileChange={(file: File) => handleImageUpload({ target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>, index)}
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

                        <div className="w-full">
                            {/* 태그 입력 */}
                            <div className="flex flex-col items-start gap-2 md:gap-[0.5rem] w-full">
                                <div className="text-[#0F1011] font-pretendard text-sm md:text-[1.25rem] font-bold leading-normal md:leading-[1.875rem]">태그 등록</div>
                                <div className="flex flex-wrap items-center w-full gap-1.5 md:gap-[0.625rem] rounded-[0.4375rem] border border-[#E2E6EF] bg-[#F8F9FC] p-2 md:p-[0.625rem]">
                                    {tags.map((tag, index) => (
                                        <div key={index} className="flex items-center gap-2.5 bg-purple-200 rounded px-2 py-1 text-center justify-center align-center h-8">
                                            <span>#{tag}</span>
                                            <button type="button" onClick={() => removeTag(index)} className="text-sm">x</button>
                                        </div>
                                    ))}
                                    <input
                                        type="text"
                                        placeholder="#태그 입력 (최대 10개)"
                                        className="flex-1 p-1.5 md:p-2 bg-transparent outline-none text-xs md:text-base"
                                        onKeyPress={handleTagInput} // 입력 이벤트 처리
                                    />
                                </div>
                            </div>
                        </div>


                        {/* 저장 버튼 */}
                        <div className="flex justify-end items-center w-full mt-3 md:mt-6">
                            <button
                                type="button"
                                onClick={handleSubmit(onSaveProject)} // 프로젝트 저장 함수 호출
                                className="flex h-8 md:h-[3.5rem] px-3 md:px-[1.75rem] py-1.5 md:py-[1.125rem] justify-center items-center rounded-[0.5rem] bg-[#776BFF]"
                            >
                                <span className="text-white text-xs md:text-[1.125rem] font-medium">
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
                        className={`w-full md:w-auto h-8 md:h-[3.5rem] px-3 md:px-[1.75rem] py-1.5 md:py-[1.125rem] justify-center items-center rounded-[0.5rem] ${canSubmit ? 'bg-[#776BFF]' : 'bg-[#E2E6EF] cursor-not-allowed'}`}
                    >
                        <span className={`text-xs md:text-[1.125rem] font-medium ${canSubmit ? 'text-white' : 'text-[#9DA1AD]'}`}>
                            프로젝트 등록하기
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
}
