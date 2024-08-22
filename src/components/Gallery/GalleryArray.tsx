'use client'

import GalleryWindow from "./GalleryWindow"
import { useRecoilValue } from "recoil"
import { filteredProjectGalleryState } from '@/context/recoil-context'

export default function GalleryArray() {
    const galleryData = useRecoilValue(filteredProjectGalleryState)
    console.log(galleryData)
    
    return (
        <div className="flex items-center gap-[0.75rem] self-stretch">
            {galleryData?.map((project) => <GalleryWindow key={project.projectId} project={project} />)}
        </div>
    )
}