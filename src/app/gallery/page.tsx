'use client'

import Banner from '@/components/Gallery/Banner';
import CategoryNav from '@/components/Gallery/Category';
import ProjectWindow from '@/components/Gallery/Window';
import { ProjectWindowData } from '@/lib/types';

export default function ProjectGallery() {
    // Dummy data for the project windows
    const dummyProjects: ProjectWindowData[] = [
        {
            imagePath: "/assets/images/project1.png",
            count: 837,
            title: "Project Title 1",
            problemAndTarget: "Problem & Target 1",
            date: "2024-08-01",
            tag: "Tag Name 1"
        },
        {
            imagePath: "/assets/images/project2.png",
            count: 123,
            title: "Project Title 2",
            problemAndTarget: "Problem & Target 2",
            date: "2024-07-15",
            tag: "Tag Name 2"
        },
        {
            imagePath: "/assets/images/project3.png",
            count: 456,
            title: "Project Title 3",
            problemAndTarget: "Problem & Target 3",
            date: "2024-06-30",
            tag: "Tag Name 3"
        },
        {
            imagePath: "/assets/images/project4.png",
            count: 789,
            title: "Project Title 4",
            problemAndTarget: "Problem & Target 4",
            date: "2024-05-20",
            tag: "Tag Name 4"
        }
    ];

    return (
        <div className="flex w-full flex-col justify-center pt-[5rem]">
            <Banner
                imgSrc="/assets/images/project_gallery_banner.png"
                title="프로젝트 갤러리"
                description="다양한 프로젝트를 만나보세요!"
                scrolledTitle="프로젝트 갤러리"
                scrolledDescription="다양한 프로젝트를 만나보세요!"
            />
            <div className="flex w-full justify-center pt-[18.375rem]">
                <div className="flex flex-col w-[75.3125rem] h-[54.1875rem] items-start mb-[10.56rem] pt-[2.56rem]">
                    {/* 상단 카테고리 창 */}
                    <div className='flex flex-col'>
                        <p className="text-[1rem] font-normal text-[#000000] mb-[0.5rem]">
                            카테고리
                        </p>
                        <CategoryNav />
                    </div>
                    {/* 프로젝트 윈도우 */}
                    <div className='flex flex-col '>
                        <div className="flex justify-end items-center gap-[1rem] mb-[1rem] w-full">
                            <p className="text-[1rem] font-normal cursor-pointer">
                                인기순
                            </p>
                            <p className="text-[1rem] font-normal cursor-pointer">
                                최신순
                            </p>
                            <p className="text-[1rem] font-normal cursor-pointer">
                                종료임박순
                            </p>
                        </div>
                        <div className="flex flex-row gap-[0.75rem]">
                            {dummyProjects.slice(0, 4).map((project, index) => (
                                <ProjectWindow key={index} data={project} />
                            ))}
                        </div>
                        <div className="flex flex-row gap-[0.75rem]">
                            {dummyProjects.slice(0, 4).map((project, index) => (
                                <ProjectWindow key={index + 4} data={project} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
