'use client'

import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { GetMyProjects } from '@/lib/action'
import { MyProjectData } from '@/lib/types'
import MyPageProjectWindow from '@/components/Gallery/GalleryWindow'

export default function MyPageProjectList() {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const [myProjects, setMyProjects] = useState<MyProjectData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);  // '더보기' 클릭 여부 상태 추가

    useEffect(() => {
        const fetchMyProjects = async () => {
            setLoading(true);
            setError(null);
            try {
                const myProjectsResponse = await GetMyProjects(accessToken);
                setMyProjects(myProjectsResponse);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError('Failed to load projects.');
            } finally {
                setLoading(false);
            }
        };

        // 함수 실행
        if (accessToken) {
            fetchMyProjects();
        }
    }, [accessToken]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // completedStatusType이 "NOT_COMPLETED"인 프로젝트만 필터링
    const notCompletedProjects = myProjects.filter(project => project.completedStatusType === 'NOT_COMPLETED');

    // '더보기' 버튼을 누르지 않았을 때는 최대 3개의 프로젝트만 보여줌
    const displayedProjects = showAll ? notCompletedProjects : notCompletedProjects.slice(0, 3);

    return (
        <div className="flex w-[56.25rem] flex-col items-start gap-[5rem] pt-[5.91rem]">
            {/* 기획 중인 프로젝트 */}
            <div className="flex flex-col w-[56.25rem]">
                <div className="flex justify-between items-center self-stretch mb-[1.88rem]">
                    <div className="text-black text-[2rem] font-semibold leading-[3rem]" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                        기획 중인 프로젝트
                    </div>
                    {/* 더보기 버튼 */}
                    <div 
                        className="text-[#6A6F7A] text-[1rem] font-medium leading-[1.5rem] cursor-pointer"
                        onClick={() => setShowAll(prev => !prev)}  // '더보기' 클릭 시 상태 변경
                    >
                        {showAll ? '접기' : '더보기'}
                    </div>
                </div>
                {/* 프로젝트를 3개씩 한 줄에 표시하고 더보기를 눌렀을 때 아래로 확장 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[0.75rem]">
                    {displayedProjects.map((project) => (
                        <MyPageProjectWindow key={project.projectId} project={project} />
                    ))}
                </div>
            </div>            
        </div>
    );
}
