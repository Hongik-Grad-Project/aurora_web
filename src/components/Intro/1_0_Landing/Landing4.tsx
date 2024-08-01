'use client'

import { motion } from "framer-motion";

export default function Landing4() {
    return (
        <div className="relative flex h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-row overflow-hidden overflow-x-auto bg-[#FFFFFF] bg-cover bg-no-repeat pt-[5rem]">    
            <motion.div 
                className="flex flex-col w-[40.3125rem] h-[14.4375rem] ml-[6.87rem] mt-[9rem]"
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
                    오로라를 만나보세요!
                </motion.div>
                <motion.h1 
                    className="text-[2.625rem] text-[#0F1A2A] font-bold leading-[3.625rem] mb-[1.19rem]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                >
                    막연했던 아이디어,
                    <br />
                    오로라가 구체화 해줄게요
                </motion.h1>
                <motion.div 
                    className="text-[#475569] text-[1.25rem] font-medium leading-[1.875rem]" 
                    style={{ fontFamily: 'Pretendard, sans-serif' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                >
                    해결하고 싶은 사회 문제가 무엇인지, 차근차근 당신의 생각을
                    <br />
                    구체화 시켜드릴게요
                </motion.div>
            </motion.div>
        </div>
    )
}
