'use client'

import SelectedIdeaNote from "@/components/Summary/SelectedIdeaNote"
import SelectedSummaryNav from "@/components/Summary/SelectedSummaryNav"



export default function SelectedProjectIdeaPage() {
  return (
    <div className="flex w-full h-screen">
      <div className="fixed left-0 top-0 h-full w-64 pt-[70px] border-r border-gray-300">
        <SelectedSummaryNav />
      </div>
      <div className="flex-grow ml-64 mt-[70px]">
        <SelectedIdeaNote />
      </div>
    </div>
  )
}