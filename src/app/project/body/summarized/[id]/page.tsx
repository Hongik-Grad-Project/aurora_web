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

interface FormInputs {
    tagInput: string; // Adjusted to handle live input
}

export default function SummarizedProjectBodyPage() {
    const router = useRouter()
    const pathname = usePathname()
    const { register, handleSubmit, watch, setValue, getValues, resetField } = useForm<FormInputs>({
        defaultValues: {
            tagInput: ''
        }
    });
    const accessToken = useRecoilValue(accessTokenState) || ''

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
    }, [subTitleList, contentList]);

    // 조건 충족 여부 확인 함수
    const areTextSectionsValid = textSections.some(section => section.subtitle.trim() !== '' && section.content.trim() !== '');
    const isImageValid = imageFiles.length > 0 && imageFiles.some((file) => file.size > 0); // 파일이 실제로 업로드된 경우만 유효
    const isTagsValid = tags.length > 0;

    const canSubmit = areTextSectionsValid && isImageValid && isTagsValid;

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

    const removeTag = (index: number) => {
        setTags(prev => prev.filter((_, i) => i !== index)); // Remove tag by index
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
            event.preventDefault();

            const input = event.target as HTMLInputElement;
            const tag = input.value.trim();

            if (tag && !tags.includes(tag)) {
                setTags((prevTags) => {
                    const updatedTags = [...prevTags, tag];
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
            console.log("프로젝트가 저장되었습니다.");
        } catch (error) {
            console.error('프로젝트 저장 오류:', error);
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
        <div className="flex w-full flex-col justify-center items-center pt-[70px]">
            <form className="flex flex-col items-start gap-[0.9375rem] pt-[2.94rem] pb-[12rem]">
                <div className="flex w-[62.5rem] items-center gap-[1.75rem]">
                    <div className="text-[#9DA1AD] font-medium text-[2.5rem] leading-[3.75rem] opacity-80">
                        프로젝트 개요
                    </div>
                    <div className="text-[#0F1011] font-bold text-[2.5rem] leading-[3.75rem]">
                        본문 작성
                    </div>
                </div>

                <div className="flex flex-col items-start gap-[1.25rem] self-stretch">
                    <div className="flex flex-col justify-center items-center gap-[1.1875rem] self-stretch p-[1.875rem] rounded-[1rem] bg-[#FEFEFE]">
                        {/* 프로젝트 본문 텍스트 입력 */}
                        {textSections.map((section, index) => (
                            <ProjectBodyText
                                key={index}
                                index={index}
                                subtitle={section.subtitle}  // 초기값 전달
                                content={section.content}    // 초기값 전달
                                onChange={(index, subtitle, content) => handleTextChange(index, subtitle, content)}
                            />
                        ))}

                        {/* 이미지 입력 부분 */}
                        <div className="flex flex-row justify-center items-center gap-x-5">
                            {imageFiles.map((_, index) => (
                                <div key={index}>
                                    <ProjectImage
                                        onFileChange={(file: File) => handleImageUpload({ target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>, index)}
                                    />
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

                        <div className="w-full">
                            {/* 태그 입력 */}
                            <div className="flex flex-col items-start gap-[0.5rem] w-full">
                                <div className="text-[#0F1011] font-pretendard text-[1.25rem] font-bold leading-[1.875rem]">태그 등록</div>
                                <div className="flex items-center w-full gap-[0.625rem] rounded-[0.4375rem] border border-[#E2E6EF] bg-[#F8F9FC] p-[0.625rem] overflow-hidden">
                                    {tags.map((tag, index) => (
                                        <div key={index} className="flex items-center gap-2.5 bg-purple-200 rounded px-2 py-1 text-center justify-center align-center h-8">
                                            <span>#{tag}</span>
                                            <button type="button" onClick={() => removeTag(index)} className="text-sm">x</button>
                                        </div>
                                    ))}

                                    <input
                                        {...register('tagInput')}
                                        type="text"
                                        placeholder="#태그 입력 (최대 10개)"
                                        className="flex-1 p-2 bg-transparent outline-none"
                                        onKeyPress={handleTagInput}
                                    />
                                </div>
                            </div>
                        </div>


                        {/* 저장 버튼 */}
                        <div className="flex justify-end items-center self-stretch pl-[44.25rem]">
                            <div className="flex items-start gap-[0.625rem]">
                                <button
                                    type="button"
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

                    {/* 등록 버튼 */}
                    <button
                        type="submit"
                        disabled={!canSubmit}
                        onClick={handleSubmit(onSubmit)}
                        className={`flex h-[3.5rem] min-w-[6rem] px-[1.75rem] py-[1.125rem] justify-center items-center gap-[0.625rem] rounded-[0.5rem] ${canSubmit ? 'bg-[#776BFF]' : 'bg-[#E2E6EF] cursor-not-allowed'} transition duration-150`}
                    >
                        <span className={`text-center font-medium text-[1.125rem] leading-[1.6875rem] ${canSubmit ? 'text-[#FEFEFE]' : 'text-[#9DA1AD]'}`}>프로젝트 등록하기</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
