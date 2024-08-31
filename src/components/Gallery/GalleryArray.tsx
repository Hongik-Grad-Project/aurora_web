'use client'

import GalleryWindow from "./GalleryWindow"
import { useRecoilValue } from "recoil"
import { filteredProjectGalleryState } from '@/context/recoil-context'

export default function GalleryArray() {
    const galleryData = useRecoilValue(filteredProjectGalleryState)
    console.log(galleryData)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4 justify-items-center"> {/* 여백 및 가운데 정렬 추가 */}
            {galleryData?.map((project) => (
                <GalleryWindow key={project.projectId} project={project} />
            ))}
        </div>
    )
}
