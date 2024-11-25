'use client'

import SelectedIdeaNote from "@/components/Summary/SelectedIdeaNote"
import SelectedSummaryNav from "@/components/Summary/SelectedSummaryNav"
import SelectedSummaryMobileNav from "@/components/Summary/SelectedSummaryMobileNav"

export default function SelectedProjectIdeaPage() {
  return (
    <div className="flex w-full h-screen">
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 pt-[45px] md:pt-[70px] border-r border-gray-300">
        <SelectedSummaryNav />
      </div>
      <div className="lg:hidden fixed top-18 w-full z-20 mt-[45px] md:mt-[70px]">
        <SelectedSummaryMobileNav />
      </div>
      <div className="flex-grow lg:ml-64 mt-[45px] md:mt-[70px]">
        <SelectedIdeaNote />
      </div>
    </div>
  )
}