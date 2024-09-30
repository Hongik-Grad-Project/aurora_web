'use client'

import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { accessTokenState, subTitleListState, contentListState } from '@/context/recoil-context'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import ProjectBodyText from '@/components/Project/ProjectBodyText'
import ProjectImage from '@/components/Project/ProjectImage'
import { EditProjectBodyData, RegisterProject } from '@/lib/action'

interface FormInputs {
    tags: string;
}

export default function SummarizedProjectBodyPage() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const { handleSubmit, setValue, formState: { isValid } } = useForm<FormInputs>({
        mode: 'onChange'
    })
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
            setValue('tags', tags.join(', '));
        } else {
            setTextSections([{ subtitle: '', content: '' }]);
            setValue('tags', tags.join(', '));
        }
    }, [subTitleList, contentList]);


    // 필수 조건을 만족하는지 확인
    const areTextSectionsValid = textSections.some(section => section.subtitle.trim() !== '' && section.content.trim() !== '');
    const isImageValid = imageFiles.length > 0;
    const isTagsValid = tags.length > 0;

    // 전체 유효성 확인
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
            const tag = input.value.trim(); // 앞뒤 공백 제거

            // 유효한 태그인지 확인하고 태그 목록에 추가
            if (tag && !tags.includes(tag)) {
                setTags((prevTags) => {
                    const updatedTags = [...prevTags, tag];
                    setValue('tags', updatedTags.join(', ')); // 폼 값 업데이트
                    return updatedTags;
                });
            }

            // 입력 필드 초기화
            input.value = '';
        }
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
            const response = await EditProjectBodyData(accessToken, projectId, payload, imageFiles);
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

                        {/* 태그 입력 */}
                        <div className="flex flex-col items-start gap-[1rem] self-stretch">
                            <div className="text-[#0F1011] font-pretendard text-[1.25rem] font-bold leading-[1.875rem]">
                                태그 등록
                            </div>
                            <div className="flex flex-col items-start gap-[0.5rem] self-stretch">
                                후원자들이 프로젝트를 쉽게 검색할 수 있도록 프로젝트와 관련된 검색 키워드를 입력해주세요! (최대 10개)
                                <div className="flex h-[2.75rem] px-[0.875rem] pr-[15.5625rem] py-[0.625rem] items-center gap-[0.625rem] self-stretch rounded-[0.4375rem] border border-[#E2E6EF] bg-[#F8F9FC]">
                                    <input
                                        type="text"
                                        placeholder="프로젝트의 태그를 입력하고 엔터해주세요"
                                        className="flex-grow bg-transparent text-[#0F1011] outline-none"
                                        onKeyPress={handleTagInput} // 변경된 부분
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 태그 리스트 표시 */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {tags.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
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
