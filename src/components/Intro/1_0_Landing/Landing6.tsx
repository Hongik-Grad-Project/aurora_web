import { useState } from 'react';
import ProjectGallery from "@/components/Gallery/Window";
import { ProjectWindowData } from '@/lib/types';
import { GetRecommendProjects } from '@/lib/action';

export default function Landing6() {
    // Sample data
    const [projects, setProjects] = useState<ProjectWindowData[]>([
        {
            imagePath: "/assets/intro/section6_dummy1.svg",
            count: 837,
            title: "개는 안돼요! 안내견의 출입을 막는 가게들",
            problemAndTarget: "사회문제: 장애인 안내견 출입 거부",
            date: "2024.10.17",
            tag: "장애인"
        },
        {
            imagePath: "/assets/intro/section6_dummy2.svg",
            count: 330,
            title: "은퇴 후 사업 시작, 안전하게!",
            problemAndTarget: "사회문제: 노인 일자리 문제",
            date: "2024.12.02",
            tag: "노인"
        },
        {
            imagePath: "/assets/intro/section6_dummy3.svg",
            count: 229,
            title: "밤늦게 혼자 집가기가 무서워요",
            problemAndTarget: "사회문제: 여성 안심 귀가길",
            date: "2024.11.23",
            tag: "여성"
        }
    ]);

    return (
        <div className="relative flex h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-col overflow-hidden overflow-x-auto bg-[#FFFFFF] bg-cover bg-no-repeat pt-[5rem]">
            <div className="flex flex-col justify-center items-center">
                <p className="mt-[4.12rem] mb-[0.56rem]">
                    사람들이 어떤 사회문제에 관심이 많은지 궁금하나요?
                </p>
                <h1 className="text-[#0F1A2A] text-[2.625rem] font-bold leading-[3.625rem] mb-[1.19rem]" >
                    이번 달에 가장 많이 응원받은 프로젝트에요
                </h1>
                <p className="text-[#475569] text-[1.25rem] font-medium leading-[1.875rem] opacity-80 mb-[2.44rem]" >
                    
                </p>
                <div className="flex flex-row gap-[0.75rem]">
                    {projects.map((project, index) => (
                        <ProjectGallery key={index} data={project} />
                    ))}
                </div>
            </div>
        </div>
    )
}