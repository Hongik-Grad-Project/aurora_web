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
        <div className="flex h-[2.75rem] px-[0.625rem] py-[0.5rem] justify-between items-center w-full rounded-[0.3125rem] bg-[#FEFEFE]">
            <div className="flex items-center gap-[0.625rem] w-[70%]">
                <div className="flex h-[1.8125rem] px-[0.625rem] py-[0.1875rem] justify-center items-center rounded-[0.25rem] bg-[rgba(225,220,255,0.40)]">
                    <div className="text-[#776BFF] text-[0.75rem] font-normal leading-[1.125rem]">
                        {project.projectTitle}
                    </div>
                </div>
                <div className="text-[#0F1011] text-[1rem] font-medium leading-[1.5rem]">
                    {project.target}
                </div>
            </div>
            <div className="text-[#6A6F7A] text-[0.75rem] font-normal leading-[1.125rem]">
                {project.endDate}
            </div>
        </div>
    )
}
