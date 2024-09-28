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

export default function ProjectOutlinePage() {
  const router = useRouter()
  const { register, handleSubmit, setValue } = useForm<FormInputs>()
  const accessToken = useRecoilValue(accessTokenState) || ''

  const [target, setTarget] = useState("");
  const [summaryValue, setSummaryValue] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectRepresentImage, setProjectRepresentImage] = useState<File | null>(null)
  const [projectRepresentImageUrl, setProjectRepresentImageUrl] = useState<string | null>(null)

  const handleTargetChange = (value: string) => {
    setTarget(value);
    setValue("target", value); // react-hook-form에 값 설정
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSummaryValue(e.target.value);
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date) {
      setEndDate(addDays(date, 100));
    }
  };

  const handleProjectTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(e.target.value);
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
      if(location) {
        const projectId = parseInt(projectIdLocation.split('/').pop()!);
        router.push(`/project/body/${projectId}`);
    } 
    } catch (error) {
      console.error('Error in POST request:', error)
    }
  }

  return (
    <>
      <div className="flex w-full flex-col justify-center items-center mt-[70px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-[0.9375rem] pt-[2.94rem] pb-[12rem]">
          <div className="flex w-[62.5rem] items-center gap-[1.75rem]">
            <div className="text-[#0F1011] font-bold text-[2.5rem] leading-[3.75rem]">
              프로젝트 개요
            </div>
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none" className="w-[0.5rem] h-[1rem] opacity-80">
                <path d="M2 2L10 10L2 18" stroke="#9DA1AD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="fill-[#E2E6EF] stroke-[#9DA1AD]" />
              </svg>
            </div>
            <div className="text-[#9DA1AD] font-medium text-[2.5rem] leading-[3.75rem] opacity-80">
              본문 작성
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-[62.5rem] p-[1.875rem] gap-[4.9375rem] rounded-[1rem] bg-[#FEFEFE]">
            {/* 타겟 대상 선택 */}
            <div className="flex flex-col items-start h-[10.8125rem] gap-[2rem] self-stretch">
              <TextLayout
                title="타겟 대상 선택"
                description={
                  <>
                    프로젝트를 통해 도움을 주고 싶은 대상과 주제를 선택하세요. <br />
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
            <div className="flex flex-col items-start h-[10.8125rem] gap-[2rem] self-stretch">
              <TextLayout
                title="사회문제 요약"
                description={
                  <>
                    내가 설정한 사회문제를 요약해서 설명해주세요 ex) 노인 일자리 문제<br />
                  </>
                }
              />
              <div className="flex flex-col items-end gap-2">
                <p className="text-[#9DA1AD] text-[0.75rem] font-normal leading-[1.125rem]">
                  {summaryValue.length}/20
                </p>
                <div className="flex w-[42.5rem] h-[2.75rem] px-[0.875rem] py-[0.625rem] pr-[15.5625rem] items-center gap-[0.625rem] rounded-[0.4375rem] border border-[#E2E6EF] bg-[#F8F9FC]">
                  <input
                    {...register("summary", { required: true })}
                    type="text"
                    value={summaryValue}
                    onChange={handleSummaryChange}
                    maxLength={20}
                    placeholder="프로젝트에 참여하기를 바라는 대상이 누구인가요?"
                    className="w-full bg-transparent text-[#6A6F7A] font-medium text-[1rem] leading-[1.5rem] font-pretendard outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 프로젝트 기간 */}
            <div className="flex flex-col items-start h-[10.8125rem] gap-[2rem] self-stretch">
              <TextLayout
                title="프로젝트 기간"
                description={
                  <>
                    정확한 기간을 정하기 어렵다면, 대략적인 시작 기간이라도 적어주세요!<br />
                    프로젝트 수행 목표가 수립되면, 실행력이 높아집니다.
                  </>
                }
              />
              <div className="flex items-center gap-[0.5rem]">
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  placeholderText="시작 날짜 선택"
                />
                <div className="text-[1.125rem] text-[#4E525C] font-normal leading-[1.6875rem] font-pretendard">~</div>
                <div className="relative flex w-[20.375rem] items-center gap-[0.625rem] px-[0.875rem] py-[0.625rem] rounded-[0.4375rem] border border-[#E2E6EF] bg-white">
                  <span className="text-[#6A6F7A]">
                    {endDate ? endDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : '종료 날짜가 계산됩니다'}
                  </span>
                </div>
              </div>
            </div>

            {/* 프로젝트 제목 */}
            <div className="flex flex-col items-start h-[10.8125rem] gap-[2rem] self-stretch">
              <TextLayout
                title="프로젝트 제목"
                description={
                  <>
                    프로젝트의 핵심 키워드를 포함하여 공백 포함 60자 이내로 작성해주세요. <br />
                    사회 문제, 대상, 얻을 수 있는 효과가 포함되면 좋습니다! ex) “은퇴 후 사업 시작, 안전하게!”
                  </>
                }
              />
              <div className="flex flex-col items-end gap-2">
                <p className="text-[#9DA1AD] text-[0.75rem] font-normal leading-[1.125rem]">
                  {projectTitle.length}/60
                </p>
                <div className="flex w-[42.5rem] h-[2.75rem] px-[0.875rem] py-[0.625rem] pr-[15.5625rem] items-center gap-[0.625rem] rounded-[0.4375rem] border border-[#E2E6EF] bg-[#F8F9FC]">
                  <input
                    {...register("projectTitle", { required: true })}
                    type="text"
                    value={projectTitle}
                    onChange={handleProjectTitleChange}
                    maxLength={60}
                    placeholder="프로젝트의 핵심 가치를 포함하여 제목에 적어주세요!"
                    className="w-full bg-transparent text-[#6A6F7A] font-medium text-[1rem] leading-[1.5rem] font-pretendard outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 대표 사진 */}
            <div className="flex flex-col items-start gap-[2rem] self-stretch">
              <TextLayout
                title="대표 사진"
                description={
                  <>
                    프로젝트를 이해하는데 가장 도움이 되는 사진을 한 장 올려주세요.<br />
                    프로젝트를 소개하기 위해 제작한 사진도 좋습니다.
                  </>
                }
              />
              <div className="relative flex w-[20.6875rem] h-[14.18569rem] p-[0.29556rem_0.44331rem] flex-col justify-center items-center gap-[0.11819rem] rounded-[0.5rem] border-[0.236px] border-[#E2E6EF] bg-[#F9F8FF]">
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer rounded-md text-center text-[#4E525C] text-[0.75rem] font-normal leading-[1.125rem]">
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
                      <span>
                        대표사진 이미지 사이즈<br />
                        최소: 가로 1400px, 세로 960px
                      </span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
            </div>

            <div className="flex pl-[51.8125rem] justify-end items-center self-stretch">
              <div className="flex items-start gap-[0.625rem]">
                <button
                  type="submit"
                  className="flex w-[6.9375rem] h-[3.5rem] min-w-[6rem] px-[1.75rem] py-[1.125rem] justify-center items-center gap-[0.625rem] rounded-[0.5rem] bg-[#776BFF]">
                  <span className="text-[#FEFEFE] text-center font-medium text-[1.125rem] leading-[1.6875rem]">
                    다음
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
