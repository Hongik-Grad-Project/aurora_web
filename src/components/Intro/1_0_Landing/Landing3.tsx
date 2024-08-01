'use client'

import { motion } from "framer-motion";

export default function Landing3() {
    return (
        <div className="relative flex h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-row overflow-hidden overflow-x-auto bg-[#FFFFFF] bg-cover bg-no-repeat pt-[5rem]">    
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
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    해결하기 어려운 세상의 다양한 사회 문제들
                </motion.div>
                <motion.h1 
                    className="text-[2.625rem] text-[#0F1A2A] font-bold leading-[3.625rem] mb-[1.19rem]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 1 }}
                >
                    우리에게 필요한 건
                    <br />
                    문제를 간파해내는 능력
                </motion.h1>
                <motion.div 
                    className="text-[#475569] text-[1.25rem] font-medium leading-[1.875rem]" 
                    style={{ fontFamily: 'Pretendard, sans-serif' }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4, duration: 1 }}
                >
                    지속적인 환경 파괴, 끊이지 않는 사회적 불평등 이런 것들을
                    <br />
                    어떻게 해결할 수 있을까요? 어떻게 하면 세상에 작은 변화를 만들어낼 수 있을까요?
                </motion.div>
            </motion.div>
        </div>
    )
}

