'use client'

import SummaryNav from '@/components/Summary/SummaryNav';
import SummaryMobileNav from '@/components/Summary/SummaryMobileNav';
import IdeaNote from '@/components/Summary/IdeaNote';

export default function ProjectIdeaPage() {
  return (
    <div className="flex w-full h-screen">
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 pt-[70px] border-r border-gray-300">
        <SummaryNav />
      </div>
      <div className="lg:hidden fixed top-18 w-full z-20 mt-[45px] md:mt-[70px]">
        <SummaryMobileNav />
      </div>
      <div className="flex-grow lg:ml-64 mt-[45px] md:mt-[70px]">
        <IdeaNote />
      </div>
    </div>
  )
}