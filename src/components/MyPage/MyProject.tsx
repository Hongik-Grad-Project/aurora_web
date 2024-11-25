'use client'

import ProjectWindow from "@/components/Gallery/Window"
import { ProjectWindowData } from '@/lib/types'
import { useRouter } from 'next/navigation'

interface MyProjectProps {
    projectData: {
        projectId: number;
        mainImagePath: string;
        projectTitle: string;
        summary: string;
        target: string;
        endDate: string;
        completedStatusType: string;
        isLike: boolean;
        likeCount: number;
    }[];
}

export default function MyProject({ projectData }: MyProjectProps) {

    const router = useRouter();

    // projectData가 비어있을 경우 대비
    if (!projectData || !Array.isArray(projectData)) {
        return <div>프로젝트 데이터가 없습니다.</div>;
    }

    const myProjects: ProjectWindowData[] = projectData.map(project => ({
        projectId: project.projectId,  // 데이터가 없을 경우 기본값 처리
        imagePath: project.mainImagePath || '', // 데이터가 없을 경우 기본값 처리
        count: project.likeCount || 0,
        title: project.projectTitle || '제목 없음',
        problemAndTarget: project.target || '대상 없음',  // 예: 문제 및 대상 필드 매핑
        date: project.endDate || '날짜 없음',
        tag: project.target || '태그 없음'  // 예: 태그 필드 매핑
    }));

    return (
        <div className="flex flex-col w-full max-w-[56.25rem] px-4 sm:px-0">
            <div className="flex justify-between items-center self-stretch mb-[1.88rem]">
                <div className="text-black text-[1.5rem] sm:text-[2rem] font-semibold leading-[3rem]">
                    나의 프로젝트
                </div>
                <div 
                    className="text-[#6A6F7A] text-[0.875rem] sm:text-[1rem] font-medium leading-[1.5rem] cursor-pointer"
                    onClick={() => router.push('/mypage/project')}
                >
                    더보기
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-[0.75rem] justify-center sm:justify-start">
                {myProjects.map((project, index) => (
                    <ProjectWindow 
                        key={index} 
                        data={project} 
                    />
                ))}
            </div>
        </div>
    );
}
