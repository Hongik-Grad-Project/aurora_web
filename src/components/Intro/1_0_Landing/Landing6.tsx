'use client';

import { useEffect, useState } from 'react';
import GalleryWindow from '@/components/Gallery/GalleryWindow';
import { ProjectGallery as ProjectGalleryType } from '@/lib/types';
import { GetRecommendProjects } from '@/lib/action';
import { motion } from "framer-motion";
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '@/context/recoil-context';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Landing6() {
    const accessToken = useRecoilValue(accessTokenState) || '';

    const [projects, setProjects] = useState<ProjectGalleryType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRecommendsProject = async () => {
        try {
            const response = await GetRecommendProjects(accessToken);
            if (response && Array.isArray(response)) {
                setProjects(response);
            } else {
                setError('Invalid response format');
            }
        } catch (err) {
            setError('An error occurred while fetching the projects.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendsProject();
    }, [accessToken]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="relative flex justify-center items-center h-screen min-h-screen
        w-full snap-mandatory snap-start snap-always flex-col md:flex-row 
        overflow-hidden bg-[#FFFFFF] bg-cover bg-no-repeat pt-[3rem]
        md:pt-[5rem]">
            <div className="flex w-full flex-col md:flex-row justify-center items-center md:justify-between gap-[3rem]">
                <motion.div
                    className="flex-1 flex flex-col items-center gap-[1.1875rem]" // 중앙 정렬 및 flex-1 적용
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                >
                    <div className="flex flex-col items-center gap-[0.375rem]">
                        <motion.div
                            className="text-center text-[#475569] text-[1rem] md:text-[1.25rem] font-medium leading-[1.875rem] opacity-80"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                        >
                            사람들이 어떤 사회문제에 관심이 많은지 궁금하나요?
                        </motion.div>
                        <motion.h1
                            className="text-center text-[#0F1A2A] text-[1.875rem] md:text-[2.625rem] font-bold leading-[2.625rem] md:leading-[3.625rem]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.4 }}
                        >
                            이번 달에 가장 많이 응원받은 프로젝트에요
                        </motion.h1>
                    </div>
                    <motion.div
                        className="text-center text-[#475569] text-[1rem] md:text-[1.25rem] font-medium leading-[1.5rem] md:leading-[1.875rem] opacity-80"
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                    >
                        사회문제를 해결하기 위한 다양한 프로젝트를 만나보세요.
                    </motion.div>
                </motion.div>
                <Swiper
                    spaceBetween={10}
                    simulateTouch={true}
                    grabCursor={true}
                    centeredSlides={true}
                    modules={[Navigation, Pagination]}
                    navigation={true}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        320: { slidesPerView: 1 },  // For mobile devices
                        768: { slidesPerView: 3 },  // For tablets and above
                    }}
                    style={{
                        maxWidth: '1200px',
                        width: '100%',
                        margin: 'auto',
                        paddingBottom: '35px' // Adds space for pagination
                    }}
                >
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <SwiperSlide key={project.projectId} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <GalleryWindow project={project} />
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <p>프로젝트가 없습니다.</p>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    );
}
