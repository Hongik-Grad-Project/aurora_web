'use client'

import SummaryNav from '@/components/Summary/SummaryNav';
import IdeaNote from '@/components/Summary/IdeaNote';

export default function ProjectIdeaPage() {
  return (
    <div className="flex w-full h-screen">
      <div className="fixed left-0 top-0 h-full w-64 pt-[70px] border-r border-gray-300">
        <SummaryNav />
      </div>
      <div className="flex-grow ml-64 mt-[70px]">
        <IdeaNote />
      </div>
    </div>
  )
}