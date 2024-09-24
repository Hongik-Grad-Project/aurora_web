'use client'

import UnderpinList from "./UnderpinList"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface LikeProjectProps {
    likeProjectData: {
        projectId: number
        target: string
        projectTitle: string
        endDate: string
    }[]
}

export default function MyUnderpinProject({ likeProjectData }: LikeProjectProps) {

    const router = useRouter();

    // likeProjectData가 비어있을 경우 대비
    if (!likeProjectData || !Array.isArray(likeProjectData)) {
        return <div>프로젝트 데이터가 없습니다.</div>;
    }

    return (
        <div className="flex flex-col items-center gap-[1.5rem] self-stretch">
            <div className="flex items-center gap-[3.6875rem] self-stretch">
                <div className="text-black text-[2rem] font-semibold leading-[3rem]">
                    내가 응원한 프로젝트
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-[1.1875rem] self-stretch">
                <div className="flex flex-col items-start self-stretch gap-2"> {/* 추가로 간격 조절 */}
                    {likeProjectData.map((project) => (
                        <Link key={project.projectId} href={`/project/${project.projectId}`} className="block w-full">  {/* block 속성 추가 */}
                            <UnderpinList project={project} />
                        </Link>
                    ))}
                </div>
            </div>
            <div
                className="flex w-[56.25rem] h-[2.8125rem] p-[0.5rem] px-[0.625rem] justify-center items-center gap-[0.625rem] rounded-[0.3125rem] bg-[#F4F6FA] cursor-pointer"
                onClick={() => router.push('/mypage/project')}
            >
                <div
                    className="text-[#0F1011] text-center text-[1rem] font-medium leading-[1.5rem]"
                >
                    더보기
                </div>
            </div>
        </div>
    )
}
