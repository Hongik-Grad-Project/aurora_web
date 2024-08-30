'use client'

import GalleryWindow from "./GalleryWindow"
import { useRecoilValue } from "recoil"
import { filteredProjectGalleryState } from '@/context/recoil-context'

export default function GalleryArray() {
    const galleryData = useRecoilValue(filteredProjectGalleryState)
    console.log(galleryData)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[0.75rem] w-full">
            {galleryData?.map((project) => (
                <GalleryWindow key={project.projectId} project={project} />
            ))}
        </div>
    )
}