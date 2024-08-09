'use client'

import ProjectWindow from "@/components/Gallery/Window"
import { ProjectWindowData } from '@/lib/types'

export default function MyProject() {
    // Sample data for demonstration purposes
    const myProjects: ProjectWindowData[] = [
        {
            imagePath: "/assets/images/my_project1.png",
            count: 120,
            title: "My Project 1",
            problemAndTarget: "Environmental Issues",
            date: "2024-08-01",
            tag: "Environment"
        },
        {
            imagePath: "/assets/images/my_project2.png",
            count: 85,
            title: "My Project 2",
            problemAndTarget: "Social Inequality",
            date: "2024-07-20",
            tag: "Social"
        },
        {
            imagePath: "/assets/images/my_project3.png",
            count: 42,
            title: "My Project 3",
            problemAndTarget: "Healthcare Access",
            date: "2024-06-15",
            tag: "Health"
        }
    ];

    return (
        <div className="flex flex-col w-[56.25rem]">
            <div className="flex justify-between items-center self-stretch mb-[1.88rem]">
                <div className="text-black text-[2rem] font-semibold leading-[3rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                    나의 프로젝트
                </div>
                <div className="text-[#6A6F7A] text-[1rem] font-medium leading-[1.5rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                    더보기
                </div>
            </div>
            <div className="flex flex-row gap-[0.75rem]">
                {myProjects.map((project, index) => (
                    <ProjectWindow key={index} data={project} />
                ))}
            </div>
        </div>
    )   
}
