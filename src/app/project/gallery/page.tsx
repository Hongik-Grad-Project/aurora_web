'use client'

import { useState } from 'react';
import Banner from '@/components/Gallery/Banner';
import GalleryCategoryNav from '@/components/Gallery/GalleryCategoryNav';
import GalleryArray from '@/components/Gallery/GalleryArray';
import Footer from '@/components/Layout/Footer';

export default function ProjectGalleryPage() {
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [sortType, setSortType] = useState('new'); // 정렬 방식
    const [pageSize] = useState(8); // 페이지당 아이템 수
    const totalPages = 5; // 전체 페이지 수 (동적으로 계산할 수도 있음)

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="flex w-full flex-col justify-center items-center pt-[70px]">
            <Banner
                imgSrc="/assets/images/project_gallery_banner.png"
                title="프로젝트 갤러리"
                subTitle="이제 행동으로 옮길 일만 남았어요"
            />

            <div className="flex w-full justify-center bg-gry10 px-4 pb-12 pt-[4rem] md:pt-[8rem] lg:pt-[2rem]">
                <div className="flex w-full flex-col items-center justify-center gap-[1.5rem] lg:flex-row lg:items-start">
                    <GalleryCategoryNav
                        currentPage={currentPage}
                        pageSize={pageSize}
                        sortType={sortType}
                        setCurrentPage={setCurrentPage}
                        setSortType={setSortType}
                    />
                </div>
            </div>

            {/* 정렬 버튼 그룹 추가 */}
            <div className="flex w-full justify-start gap-4 mb-8 px-4 md:justify-center lg:justify-end lg:pr-[6%]"> {/* 오른쪽 간격을 비율로 변경 */}
                <button
                    className={`text-lg font-semibold ${sortType === 'likeCount' ? 'text-[#AEA0FF]' : 'text-gray-500'}`}
                    onClick={() => setSortType('likeCount')}
                >
                    인기순
                </button>
                <button
                    className={`text-lg font-semibold ${sortType === 'recentTime' ? 'text-[#AEA0FF]' : 'text-gray-500'}`}
                    onClick={() => setSortType('recentTime')}
                >
                    최신순
                </button>
                <button
                    className={`text-lg font-semibold ${sortType === 'closingTime' ? 'text-[#AEA0FF]' : 'text-gray-500'}`}
                    onClick={() => setSortType('closingTime')}
                >
                    종료임박순
                </button>
            </div>

            <div className="flex flex-col items-start gap-[1.375rem] self-stretch">
                <GalleryArray currentPage={currentPage} pageSize={pageSize} />
            </div>

            {/* 페이지네이션 UI */}
            <div className="flex justify-center items-center mt-8 gap-4">
                <button
                    className={`px-4 py-2 rounded-full transition-colors duration-300 ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#AEA0FF] text-white hover:bg-[#776BFF]'
                        }`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    이전
                </button>

                <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        const isActive = currentPage === page;

                        return (
                            <button
                                key={page}
                                className={`px-3 py-1 rounded-full transition-all duration-300 ${isActive ? 'bg-[#AEA0FF] text-white scale-110' : 'bg-gray-200 text-gray-800 hover:bg-[#776BFF] hover:text-white'
                                    }`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                <button
                    className={`px-4 py-2 rounded-full transition-colors duration-300 ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#AEA0FF] text-white hover:bg-[#776BFF]'
                        }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    다음
                </button>
            </div>

            <Footer />
        </div>
    );
}
