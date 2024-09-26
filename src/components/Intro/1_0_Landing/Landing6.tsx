'use client'

import { useEffect, useState } from 'react';
import GalleryWindow from '@/components/Gallery/GalleryWindow';
import { ProjectGallery as ProjectGalleryType } from '@/lib/types'; // 응답 데이터 타입
import { GetRecommendProjects } from '@/lib/action';

import { useRecoilValue } from 'recoil';
import { accessTokenState, authState } from '@/context/recoil-context';

export default function Landing6() {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const isAuth = useRecoilValue(authState);

    const [projects, setProjects] = useState<ProjectGalleryType[]>([]); // 프로젝트 리스트 상태
    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
    const [error, setError] = useState<string | null>(null); // 에러 상태

    // 추천 프로젝트 조회 함수
    const fetchRecommendsProject = async () => {
        try {
            const response = await GetRecommendProjects(accessToken);
            console.log(response);
            setProjects(response); // 프로젝트 리스트 상태 업데이트
        } catch (err) {
            console.error('Error fetching recommended projects:', err);
            setError('An error occurred while fetching the projects.');
        } finally {
            setLoading(false); // 로딩 완료
        }
    };

    useEffect(() => {
        if (accessToken) {
            fetchRecommendsProject(); // 컴포넌트가 마운트될 때 데이터 요청
        }
    }, [accessToken]);

    if (loading) {
        return <div>Loading...</div>; // 로딩 중일 때 표시
    }

    if (error) {
        return <div>Error: {error}</div>; // 에러 발생 시 표시
    }

    return (
        <div className="relative flex h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-col overflow-hidden overflow-x-auto bg-[#FFFFFF] bg-cover bg-no-repeat pt-[5rem]">
            <div className="flex flex-col justify-center items-center">
                <p className="mt-[4.12rem] mb-[0.56rem]">
                    사람들이 어떤 사회문제에 관심이 많은지 궁금하나요?
                </p>
                <h1 className="text-[#0F1A2A] text-[2.625rem] font-bold leading-[3.625rem] mb-[1.19rem]">
                    이번 달에 가장 많이 응원받은 프로젝트에요
                </h1>
                <p className="text-[#475569] text-[1.25rem] font-medium leading-[1.875rem] opacity-80 mb-[2.44rem]">
                    사회문제를 해결하기 위한 다양한 프로젝트를 만나보세요.
                </p>
                <div className="flex flex-row gap-[0.75rem]">
                    {projects.map((project) => (
                        <GalleryWindow key={project.projectId} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
}
