import Banner from '@/components/Gallery/Banner'
import CategoryNav from '@/components/Gallery/Category'
import ProjectWindow from '@/components/Gallery/Window'

export default function projectGallery() {
    return (
        <div className="flex w-full flex-col justify-center pt-[5rem]">
            <Banner
                imgSrc="/assets/images/project_gallery_banner.png"
                title="프로젝트 갤러리"
                description="다양한 프로젝트를 만나보세요!"
                scrolledTitle="프로젝트 갤러리"
                scrolledDescription="다양한 프로젝트를 만나보세요!"
            />
            <div className="flex w-full justify-center pt-[18.375rem]">
                <div className="flex flex-col w-[75.3125rem] h-[54.1875rem] items-start mb-[10.56rem] pt-[2.56rem]">
                    {/* 상단 카테고리 창 */}
                    <div className='flex flex-col'>
                        <p className="font-[1rem] font-normal font-[#000000] mb-[0.5rem]">
                            카테고리
                        </p>
                        <CategoryNav />
                    </div>
                    {/* 프로젝트 윈도우 */}
                    <div className='flex flex-col '>
                        <div className="flex justify-end items-center gap-[1rem] mb-[1rem] w-full">
                            <p className="text-[1rem] font-normal">
                                인기순
                            </p>
                            <p className="text-[1rem] font-normal">
                                최신순
                            </p>
                            <p className="text-[1rem] font-normal">
                                종료임박순
                            </p>
                        </div>
                        <div className="flex flex-row gap-[0.75rem]">
                            <ProjectWindow />
                            <ProjectWindow />
                            <ProjectWindow />
                            <ProjectWindow />
                        </div>
                        <div className="flex flex-row gap-[0.75rem]">
                            <ProjectWindow />
                            <ProjectWindow />
                            <ProjectWindow />
                            <ProjectWindow />
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    )
}