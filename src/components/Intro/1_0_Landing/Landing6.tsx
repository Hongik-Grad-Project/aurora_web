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
        <div className="relative flex justify-center items-center h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-col md:flex-col overflow-hidden bg-[#FFFFFF] bg-cover bg-no-repeat pt-[3rem] md:pt-[5rem] md:px-[5rem]">
            <div className="flex w-full flex-col md:flex-row justify-center items-center md:justify-center gap-[3rem] md:gap-[5rem] transition-all duration-500 ease-in-out">
                {/* Text Section */}
                <motion.div
                    className="flex-1 flex flex-col items-center md:items-center gap-[1.1875rem]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                >
                    <motion.div
                        className="text-center text-[#475569] text-[1rem] md:text-[1.25rem] font-medium leading-[1.875rem] opacity-80"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                    >
                        사람들이 어떤 문제에 관심이 많은지 궁금하나요?
                    </motion.div>
                    <motion.h1
                        className="text-center text-[#0F1A2A] text-[1.875rem] md:text-[2.625rem] font-bold leading-[2.625rem] md:leading-[3.625rem]"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        이번 달에 가장 많이<br className="block md:hidden" /> 응원받은 프로젝트에요
                    </motion.h1>
                </motion.div>
                {/* Swiper Section for Mobile */}
                <div className="block md:hidden w-full mt-[2rem]">
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
            {/* Swiper Section for Larger Screens */}
            <div className="hidden md:block w-full mt-[3rem]">
                <div className="w-full flex flex-row flex-wrap justify-center items-center gap-[2rem] transition-all duration-500 ease-in-out">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project.projectId} className="w-[30%] flex justify-center">
                                <GalleryWindow project={project} />
                            </div>
                        ))
                    ) : (
                        <p>프로젝트가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}