'use client'

import { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form'
import { TargetObject } from "@/lib/data";
import { addDays } from "date-fns";
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { useRouter } from 'next/navigation'
import Image from "next/image";
import Dropdown from "@/components/common/component/Basic/Dropdown";
import TextLayout from "@/components/common/component/Basic/TextLayout";
import DatePicker from "@/components/common/component/Basic/DatePicker";
import { PostProjectOutlineData } from "@/lib/action";

interface FormInputs {
  target: string
  summary: string
  startDate: string
  endDate: string
  projectTitle: string
}

interface FormInputs {
  target: string
  summary: string
  startDate: string
  endDate: string
  projectTitle: string
}

export default function ProjectOutlinePage() {
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { isValid }, watch } = useForm<FormInputs>({
    mode: 'onChange' // 사용자가 입력할 때마다 유효성 검사
  })
  const accessToken = useRecoilValue(accessTokenState) || ''

  const [target, setTarget] = useState("");
  const [summaryValue, setSummaryValue] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectRepresentImage, setProjectRepresentImage] = useState<File | null>(null)
  const [projectRepresentImageUrl, setProjectRepresentImageUrl] = useState<string | null>(null)

  // react-hook-form에서 모든 필드의 값과 이미지를 감시하여 폼 유효성 확인
  const watchFields = watch();
  const isImageUploaded = projectRepresentImage !== null;

  const handleTargetChange = (value: string) => {
    setTarget(value);
    setValue("target", value); // react-hook-form에 값 설정
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSummaryValue(e.target.value);
    setValue("summary", e.target.value); // react-hook-form에 값 설정
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    setValue("startDate", date ? date.toISOString() : ''); // react-hook-form에 값 설정
    if (date) {
      setEndDate(addDays(date, 100));
    }
  };

  const handleProjectTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(e.target.value);
    setValue("projectTitle", e.target.value); // react-hook-form에 값 설정
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
        return
      }
      setProjectRepresentImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectRepresentImage(file)
        setProjectRepresentImageUrl(URL.createObjectURL(file))
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!accessToken) return;

    const dto = {
      target,
      summary: summaryValue,
      startDate,
      endDate,
      projectTitle,
    };

    try {
      const projectIdLocation = await PostProjectOutlineData(accessToken, dto, projectRepresentImage);
      if (projectIdLocation) {
        const projectId = parseInt(projectIdLocation.split('/').pop()!);
        router.push(`/project/body/${projectId}`);
      }
    } catch (error) {
      console.error('Error in POST request:', error)
    }
  }

  return (
    <div className="flex w-full flex-col justify-center items-center mt-[30px] md:mt-[70px] px-4 md:px-0">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-3 md:gap-[0.9375rem] w-full max-w-[62.5rem] pt-4 md:pt-[2.94rem] pb-8 md:pb-[12rem]">
        {/* 헤더 섹션 */}
        <div className="flex w-full items-center gap-3 md:gap-[1.75rem]">
          <div className="text-[#0F1011] font-bold text-xl md:text-[2.5rem] leading-normal md:leading-[3.75rem]">
            개요 작성
          </div>
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none" className="w-3 h-4 md:w-[0.5rem] md:h-[1rem] opacity-80">
              <path d="M2 2L10 10L2 18" stroke="#9DA1AD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-[#9DA1AD] font-medium text-xl md:text-[2.5rem] leading-normal md:leading-[3.75rem] opacity-80">
            본문 작성
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full p-4 md:p-[1.875rem] gap-8 md:gap-[5rem] rounded-[1rem] bg-[#FEFEFE]">
          {/* 타겟 대상 선택 */}
          <div className="flex flex-col items-start gap-4 md:gap-[2rem] w-full">
            <TextLayout
              title="타겟 대상 선택"
              description={
                <>
                  프로젝트를 통해 도움을 주고 싶은 대상과 주제를 선택하세요. <br className="hidden md:block" />
                  예를 들어, 유기견 관련 프로젝트를 진행하고 싶다면 대상은 &ldquo;유기견&rdquo;, 주제는 &ldquo;유기동물&rdquo; 입니다.
                </>
              }
            />
            <Dropdown
              value={target}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleTargetChange(e.target.value)}
              name="target"
              placeholder="대상 선택"
              options={TargetObject.map(target => ({ value: target, label: target }))}
              required
              className="w-full"
            />
          </div>

          {/* 사회 문제 요약 */}
          <div className="flex flex-col items-start w-full">
            <TextLayout
              title="문제 요약"
              description="해결하고 싶은 문제가 무엇인지 간단하게 적어주세요."
            />
            <div className="flex flex-col items-end gap-2 w-full">
              <p className="text-[#9DA1AD] text-xs font-normal">
                {summaryValue.length}/20
              </p>
              <div className="flex w-full md:w-[42.5rem] h-[2.75rem] px-3 md:px-[0.875rem] py-2 items-center gap-2 rounded-[0.4375rem] border border-[#E2E6EF] bg-[#F8F9FC]">
                <input
                  {...register("summary", { required: true })}
                  type="text"
                  value={summaryValue}
                  onChange={handleSummaryChange}
                  maxLength={20}
                  placeholder="프로젝트에 참여하기를 바라는 대상이 누구인가요?"
                  className="w-full bg-transparent text-[#6A6F7A] text-sm md:text-base font-medium leading-normal outline-none"
                />
              </div>
            </div>
          </div>

          {/* 프로젝트 기간 */}
          <div className="flex flex-col items-start w-full gap-4 md:gap-[2rem]">
            <TextLayout
              title="프로젝트 기간"
              description={
                <>
                  정확한 기간을 정하기 어렵다면, 대략적인 시작 기간이라도 적어주세요!<br />
                  프로젝트 수행 목표가 수립되면, 실행력이 높아집니다.
                </>
              }
            />
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-[0.5rem] w-full">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                placeholderText="시작 날짜 선택"
                className="w-full md:w-auto"
              />
              <div className="text-base md:text-[1.125rem] text-[#4E525C]">~</div>
              <div className="relative flex w-full md:w-[20.375rem] items-center gap-2 px-3 md:px-[0.875rem] py-2 rounded-[0.4375rem] border border-[#E2E6EF] bg-white">
                <span className="text-[#6A6F7A] text-sm md:text-base">
                  {endDate ? endDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : '종료 날짜가 계산됩니다'}
                </span>
              </div>
            </div>
          </div>

          {/* 대표 사진 */}
          <div className="flex flex-col items-start gap-4 md:gap-[2rem] w-full">
            <TextLayout
              title="대표 사진"
              description={
                <>
                  프로젝트를 이해하는데 가장 도움이 되는 사진을 한 장 올려주세요.<br />
                  프로젝트를 소개하기 위해 제작한 사진도 좋습니다.
                </>
              }
            />
            <div className="relative flex w-full md:w-[20.6875rem] aspect-video md:h-[14.18569rem] p-1 flex-col justify-center items-center gap-1 rounded-[0.5rem] border border-[#E2E6EF] bg-[#F9F8FF]">
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer rounded-md text-center text-[#4E525C] text-xs md:text-[0.75rem]">
                {projectRepresentImageUrl ? (
                  <Image
                    src={projectRepresentImageUrl}
                    layout="fill"
                    objectFit="contain"
                    alt="대표 사진"
                    className="rounded-[0.5rem]"
                  />
                ) : (
                  <>
                    <Image
                      src={'/assets/icons/add_image.svg'}
                      width={30}
                      height={30}
                      alt="사진 추가"
                    />
                    <span className="text-xs md:text-sm">
                      대표사진 이미지 사이즈<br />
                      최소: 가로 1400px, 세로 960px
                    </span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex w-full justify-end mt-4 md:mt-6">
          <button
            type="submit"
            disabled={!isValid || !isImageUploaded}
            className={`flex h-12 md:h-[3.5rem] px-6 md:px-[1.75rem] py-3 md:py-[1.125rem] justify-center items-center rounded-[0.5rem] ${
              isValid && isImageUploaded ? 'bg-[#776BFF] cursor-pointer' : 'bg-[#E2E6EF] cursor-not-allowed'
            }`}
          >
            <span className={`text-center text-base md:text-[1.125rem] ${
              isValid && isImageUploaded ? 'text-[#FEFEFE]' : 'text-[#9DA1AD]'
            }`}>
              다음
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}