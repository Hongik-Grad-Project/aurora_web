'use client'

import Image from 'next/image'
import { motion } from "framer-motion";

export default function Landing5() {
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
                            언제 어디서든, 간편한 아이디어 기록
                        </motion.div>
                        <motion.h1
                            className="text-center text-[#0F1A2A] text-[1.875rem] md:text-[2.625rem] font-bold leading-[2.625rem] md:leading-[3.625rem]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.4 }}
                        >
                            대화 내용이 요약되어
                            <br />
                            핵심을 한눈에 볼 수 있어요
                        </motion.h1>
                    </div>
                    <motion.div
                        className="text-center text-[#475569] text-[1rem] md:text-[1.25rem] font-medium leading-[1.5rem] md:leading-[1.875rem] opacity-80"
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                    >
                        시간이 지나도 잊어버리지 않고 빠르게 프로젝트를 수행할 수 있어요.
                    </motion.div>
                </motion.div>
                <motion.div
                    className="flex-1 order-last md:order-none" // 모바일에서는 첫 번째로, 데스크톱에서는 순서 없음
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <Image
                        src={'/assets/intro/section5_summary.png'}
                        width={793}
                        height={511}
                        alt="landing3"
                    />
                </motion.div>
            </div>
        </div >
    )
}
