'use client'

import ProjectWindow from "@/components/Gallery/Window"
import { ProjectWindowData } from '@/lib/types'

interface MyProjectProps {
    projectData: {
        projectId: number
        mainImagePath: string
        projectTitle: string
        summary: string
        target: string
        endDate: string
        completedStatusType: string
        isLike: boolean
        likeCount: number
    }[]
}

export default function MyProject({ projectData }: MyProjectProps) {
    // Map the incoming projectData to the structure expected by ProjectWindow
    const myProjects: ProjectWindowData[] = projectData.map(project => ({
        imagePath: project.mainImagePath,
        count: project.likeCount,
        title: project.projectTitle,
        problemAndTarget: project.target,
        date: project.endDate,
        tag: project.target
    }));

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
