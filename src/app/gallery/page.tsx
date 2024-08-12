'use client'

import Banner from '@/components/Gallery/Banner';
import CategoryNav from '@/components/Gallery/Category';
import ProjectWindow from '@/components/Gallery/Window';
import { ProjectWindowData } from '@/lib/types';

export default function ProjectGalleryPage() {
    return (
        <div className="flex w-full flex-col justify-center pt-[61px]">
            <Banner
                imgSrc="/assets/images/project_gallery_banner.png"
                title="프로젝트 갤러리"
                subTitle="이제 행동으로 옮길 일만 남았어요"
                scrolledTitle="프로젝트 갤러리"
            />

            <div className="flex w-full justify-center bg-gry10 px-4 pb-24 pt-[16rem]">
                <div className="flex w-full flex-col items-center justify-center gap-[1.5rem] lg:flex-row lg:items-start">
                    <div className="lg:w-[47rem]">
                        <CategoryNav />
                    </div>
                </div>
            </div>

            {/* <div className="flex w-full justify-center pt-[18.375rem]">
                <div className="flex flex-col w-[75.3125rem] h-[54.1875rem] items-start mb-[10.56rem] pt-[2.56rem]">
                    <div className='flex flex-col'>
                        <CategoryNav />
                    </div>
                </div>
            </div> */}
        </div>
    );
}
