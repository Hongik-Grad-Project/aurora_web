'use client'

import Banner from '@/components/Gallery/Banner';
import GalleryCategoryNav from '@/components/Gallery/GalleryCategoryNav';
import GalleryArray from '@/components/Gallery/GalleryArray';

export default function ProjectGalleryPage() {
    return (
        <div className="flex w-full flex-col justify-center items-center pt-[70px]">
            <Banner
                imgSrc="/assets/images/project_gallery_banner.png"
                title="프로젝트 갤러리"
                subTitle="이제 행동으로 옮길 일만 남았어요"
            />


            <div className="flex w-full justify-center bg-gry10 px-4 pb-24 pt-[16rem]">
                <div className="flex w-full flex-col items-center justify-center gap-[1.5rem] lg:flex-row lg:items-start">
                    <GalleryCategoryNav />
                </div>
            </div>

            {/* Frame 1948755248 */}
            <div className="flex flex-col items-start gap-[4.375rem] self-stretch">
                <GalleryArray />
            </div>
        </div>
    );
}
