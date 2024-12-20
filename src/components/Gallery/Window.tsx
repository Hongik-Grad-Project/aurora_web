'use client'

import ProjectTag from './Tag'
import { useRouter, usePathname } from 'next/navigation';

interface ProjectWindowData {
    projectId: number;
    imagePath: string;
    count: number;
    title: string;
    problemAndTarget: string;
    date: string;
    tag: string;
}

interface ProjectWindowProps {
    data: ProjectWindowData;
}

export default function ProjectWindow({ data }: ProjectWindowProps) {
    
    const router = useRouter();
    const currentPath = usePathname();

    const handleClick = () => {
        localStorage.setItem('previousPath', currentPath);
        router.push(`/project/${data.projectId}`);  // projectId를 사용해 동적으로 경로 이동
    };

    if (!data) {
        return <div>Loading...</div>; // Or return null or a skeleton component
    }
    
    return (
        <div className="flex flex-col items-start mb-[4.38rem] cursor-pointer"
            onClick={handleClick}  // 클릭 이벤트 핸들러 추가
        >
            <div
                className="flex w-[18.25rem] h-[12.5rem] rounded-[0.625rem] mb-[0.75rem] relative"
                style={{
                    backgroundImage: `url(${data.imagePath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="flex items-center h-[24px] px-3 gap-[4px] absolute right-[11.5px] top-[12px] rounded bg-[#F4F6FA] z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" viewBox="0 0 11 14" fill="none">
                        <path d="M9.50245 6.39985C9.32998 6.17489 9.12002 5.97993 8.92506 5.78496C8.42265 5.33505 7.85275 5.01261 7.37284 4.54019C6.25555 3.44539 6.00809 1.63822 6.72046 0.250977C6.00809 0.423445 5.38571 0.813374 4.8533 1.2408C2.91116 2.80051 2.1463 5.55251 3.06113 7.91457C3.09113 7.98956 3.12112 8.06455 3.12112 8.16203C3.12112 8.327 3.00864 8.47697 2.85867 8.53696C2.6862 8.61195 2.50623 8.56695 2.36376 8.44698C2.3212 8.41133 2.28561 8.3681 2.25878 8.3195C1.41143 7.2472 1.27646 5.70998 1.84635 4.4802C0.594084 5.50002 -0.0882913 7.2247 0.00919087 8.8519C0.0541826 9.22683 0.0991744 9.60176 0.226651 9.9767C0.331632 10.4266 0.534095 10.8765 0.759054 11.274C1.56891 12.5712 2.97115 13.5011 4.47837 13.6885C6.08308 13.891 7.80026 13.5985 9.03004 12.4887C10.4023 11.244 10.8822 9.24933 10.1773 7.53964L10.0798 7.34468C9.92238 6.99974 9.50245 6.39985 9.50245 6.39985ZM7.13289 11.124C6.92292 11.304 6.57799 11.4989 6.30804 11.5739C5.46819 11.8738 4.62835 11.4539 4.13344 10.959C5.02577 10.7491 5.55817 10.0892 5.71565 9.4218C5.84312 8.82191 5.60317 8.327 5.50568 7.7496C5.4157 7.19471 5.4307 6.72229 5.63316 6.20489C5.77563 6.48983 5.92561 6.77478 6.10557 6.99974C6.68297 7.7496 7.5903 8.07954 7.78527 9.09936C7.81526 9.20434 7.83026 9.30932 7.83026 9.4218C7.85275 10.0367 7.5828 10.7116 7.13289 11.124Z" fill="#776BFF" />
                    </svg>
                    <span className="text-[#0F1011] font-pretendard text-[14px] font-bold leading-[21px]">
                        {data.count}
                    </span>
                </div>
            </div>

            <ProjectTag text={data.tag} />
            <p className="text-[#0F1011] text-[1.125rem] font-semibold mb-[0.25rem]">
                {data.title}
            </p>
            <p className="text-[#4E525C] text-[0.875rem] font-normal">
                {data.problemAndTarget}
            </p>
            <p className="text-[#9DA1AD] text-[0.875rem] font-normal">
                {data.date}
            </p>
        </div>
    )
}