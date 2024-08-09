'use client'

import Image from 'next/image'
import { motion } from "framer-motion";

export default function Landing5() {
    return (
        <div className="relative flex justify-center h-screen min-h-screen 
        w-full snap-mandatory snap-start snap-always flex-row overflow-hidden 
        overflow-x-auto bg-[#FFFFFF] bg-cover bg-no-repeat pt-[5rem]
        ">
            <div className="flex w-full flex-row justify-between items-start 
            gap-[1.19rem] pl-[6.87rem]">
                <motion.div
                    className="inline-flex flex-col items-start gap-[1.1875rem] mt-[9rem]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <div className="flex flex-col items-start gap-[0.375rem]">
                        <motion.div
                            className="flex text-[1.25rem] text-[#475569] mb-[0.38rem]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                        >
                            언제 어디서든, 간편한 아이디어 기록
                        </motion.div>
                        <motion.h1
                            className="text-[2.625rem] text-[#0F1A2A] font-bold leading-[3.625rem] mb-[1.19rem]"
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
                        className="text-[#475569] text-[1.25rem] font-medium leading-[1.875rem]"
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                    >
                        시간이 지나도 잊어버리지 않고 빠르게 프로젝트를 수행할 수 있어요.
                    </motion.div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: 1,
                        duration: 1.0,
                    }}
                    className="mt-[4.88rem]"
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
