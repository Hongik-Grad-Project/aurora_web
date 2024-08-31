'use client'

import Banner from '@/components/Gallery/Banner';
import GalleryCategoryNav from '@/components/Gallery/GalleryCategoryNav';
import GalleryArray from '@/components/Gallery/GalleryArray';
import Footer from '@/components/Layout/Footer';

export default function ProjectGalleryPage() {
    return (
        <div className="flex w-full flex-col justify-center items-center pt-[70px]">
            <Banner
                imgSrc="/assets/images/project_gallery_banner.png"
                title="프로젝트 갤러리"
                subTitle="이제 행동으로 옮길 일만 남았어요"
            />

            <div className="flex w-full justify-center bg-gry10 px-4 pb-12 pt-[4rem] md:pt-[8rem] lg:pt-[2rem]">
                <div className="flex w-full flex-col items-center justify-center gap-[1.5rem] lg:flex-row lg:items-start">
                    <GalleryCategoryNav />
                </div>
            </div>

            <div className="flex flex-col items-start gap-[4.375rem] self-stretch">
                <GalleryArray />
            </div>

            <div className="flex justify-between items-center w-full mt-8">
                <button className="px-4 py-2 bg-gray-300 text-white rounded">Previous</button>
                <button className="px-4 py-2 bg-gray-300 text-white rounded">Next</button>
            </div>
            <Footer />
        </div>
    );
}