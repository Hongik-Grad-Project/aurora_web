'use client'

import NoteList from '@/components/IdeaNote/NoteList'
import SummaryProject from '@/components/IdeaNote/Summary'

export default function IdeaNotePage() {
  return (
    <div className="flex flex-col w-full justify-center bg-lightGrey mt-[5rem]">
        <div className="flex flex-row">
            <NoteList />
            <SummaryProject />
        </div>
    </div>
  )
}