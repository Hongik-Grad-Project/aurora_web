'use client'

interface UnderpinListProps {
    project: {
        projectId: number
        target: string
        projectTitle: string
        endDate: string
    }
}

export default function UnderpinList({ project }: UnderpinListProps) {
    return (
        <div className="flex h-[2.75rem] w-full px-[0.625rem] py-[0.5rem] justify-between items-center rounded-[0.3125rem] bg-[#FEFEFE]">
            {/* Left side: Tag and Title */}
            <div className="flex items-center gap-[0.625rem] w-[100%]">
                {/* Target Tag */}
                <div className="flex h-[1.8125rem] px-[0.625rem] py-[0.1875rem] justify-center items-center rounded-[0.25rem] bg-[rgba(225,220,255,0.40)]">
                    <div className="text-[#776BFF] text-[0.75rem] font-normal leading-[1.125rem]">
                        {project.target}
                    </div>
                </div>
                {/* Project Title */}
                <div className="flex-1 text-[#0F1011] text-[1rem] font-medium leading-[1.5rem] truncate">
                    {project.projectTitle}
                </div>
            </div>
            {/* Right side: End Date */}
            <div className="flex-shrink-0 text-[#6A6F7A] text-[0.75rem] font-normal leading-[1.125rem]">
                {project.endDate}
            </div>
        </div>
    )
}
