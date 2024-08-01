'use client'

import { motion } from "framer-motion";

export default function Landing5() {
    return (
        <div className="relative flex h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-row overflow-hidden overflow-x-auto bg-[#F4F6FA] bg-cover bg-no-repeat pt-[5rem]">    
            <motion.div 
                className="flex flex-col w-[40.3125rem] h-[14.4375rem] ml-[6.87rem] mt-[9.03rem]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
            >
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
        </div>
    )
}
