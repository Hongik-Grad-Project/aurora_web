'use client'

import GalleryWindow from "./GalleryWindow"
import { useRecoilValue } from "recoil"
import { filteredProjectGalleryState } from '@/context/recoil-context'
import Link from 'next/link'

interface GalleryArrayProps {
    currentPage: number;
    pageSize: number;
}

export default function GalleryArray({ currentPage, pageSize }: GalleryArrayProps) {
    // Recoil에서 페이지당 데이터를 받아옴
    const galleryData = useRecoilValue(filteredProjectGalleryState); 

    if (!galleryData || galleryData.length === 0) {
        return <div>Loading...</div>; // 데이터를 불러오는 동안 또는 데이터가 없을 때 로딩 표시
    }

    // 페이지별로 받아온 데이터 그대로 사용
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4 justify-items-center">
            {galleryData.map((project) => (
                <Link key={project.projectId} href={`/project/${project.projectId}`}>
                    <GalleryWindow project={project} />
                </Link>
            ))}
        </div>
    );
}
