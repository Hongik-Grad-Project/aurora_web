'use client'

import ProjectList from '@/components/Project/ProjectList'
import ProjectSummary from '@/components/Project/ProjectSummary'

export default function ProjectIdeaPage() {
  return (
    <div className="flex w-full flex-col justify-center pt-[80px]">
      <div className="flex items-start gap-[0.9375rem]">
        <ProjectList />
        <ProjectSummary />
      </div>
    </div>
  )
}