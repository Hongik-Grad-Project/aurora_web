'use client'
import Image from 'next/image'
import { motion } from "framer-motion";

export default function Landing4() {
    return (
        <div className="relative flex justify-center items-center h-screen min-h-screen
        w-full snap-mandatory snap-start snap-always flex-col md:flex-row 
        overflow-hidden bg-[#FFFFFF] bg-cover bg-no-repeat pt-[3rem]
        md:pt-[5rem]">
            <div className="flex w-full flex-col md:flex-row justify-center md:justify-between items-center gap-[3rem] md:pl-[5rem]">
                {/* 왼쪽 텍스트 섹션 */}
                <motion.div
                    className="flex-1 flex flex-col md:items-start items-center gap-[1.1875rem]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                >
                    <motion.div
                        className="text-center md:text-left text-[#475569] text-[1rem] md:text-[1.25rem] font-medium leading-[1.875rem] opacity-80"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                    >
                        오로라를 만나보세요!
                    </motion.div>
                    <motion.h1
                        className="text-center md:text-left text-[#0F1A2A] text-[1.875rem] md:text-[2.625rem] font-bold leading-[2.625rem] md:leading-[3.625rem]"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        막연했던 아이디어,
                        <br />
                        오로라가 구체화 해줄게요
                    </motion.h1>

                    <motion.div
                        className="text-center md:text-left text-[#475569] text-[1rem] md:text-[1.25rem] font-medium leading-[1.5rem] md:leading-[1.875rem] opacity-80"
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        해결하고 싶은 문제가 무엇인지,<br className="block md:hidden" /> 차근차근 당신의 생각을 구체화 시켜드릴게요
                    </motion.div>
                </motion.div>
                <motion.div
                    className="flex-1 order-last md:order-none" // 모바일에서는 첫 번째로, 데스크톱에서는 순서 없음
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <Image
                        src={'/assets/intro/section4_notebook.png'}
                        width={920}
                        height={542}
                        alt="landing3"
                        className="mx-auto"
                    />
                </motion.div>
            </div >
        </div >
    )
}
