'use client'

import ProjectSummary from '@/components/Project/ProjectSummary';
import SummaryNav from '@/components/Summary/SummaryNav';
import { accessTokenState } from '@/context/recoil-context'
import { useRecoilValue } from 'recoil'

export default function ProjectIdeaPage() {
  const accessToken = useRecoilValue(accessTokenState) || ''

  return (
    <div className="flex w-full h-screen">
      <div className="fixed left-0 top-0 h-full w-[16.25rem] pt-[70px]">
        <SummaryNav />
      </div>
      <div className="flex-grow ml-[16.25rem] flex flex-col">
        <ProjectSummary />
      </div>
    </div>
  )
}