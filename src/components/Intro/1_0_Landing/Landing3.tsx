'use client'
import Image from 'next/image'
import { motion } from "framer-motion";

export default function Landing3() {
    return (
        <div className="relative flex justify-center h-screen min-h-screen 
        w-full snap-mandatory snap-start snap-always flex-row overflow-hidden 
        overflow-x-auto bg-[#FFFFFF] bg-cover bg-no-repeat pt-[5rem]">
            <div className="flex w-full flex-row justify-between items-start pr-[3.19rem] pl-[6.87rem]">
                <motion.div
                    className="inline-flex flex-col items-start gap-[1.1875rem] mt-[9.03rem]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <div className="flex flex-col items-start gap-[0.375rem]">
                        <motion.div
                            className="text-[#475569] text-[1.25rem] font-medium leading-[1.875rem] opacity-80"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            해결하기 어려운 세상의 다양한 사회 문제들
                        </motion.div>
                        <motion.h1
                            className="text-[#0F1A2A] text-[2.625rem] font-bold leading-[3.625rem]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 1 }}
                        >
                            우리에게 필요한 건
                            <br />
                            문제를 간파해내는 능력
                        </motion.h1>
                    </div>
                    <motion.div
                        className="text-[#475569] text-[1.25rem] font-medium leading-[1.875rem] opacity-80"
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
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 1,
                        duration: 1.0,
                    }}
                    className="mt-[11.69rem]"
                >
                    <Image
                        src={'/assets/intro/section3bubble.png'}
                        width={589}
                        height={378}
                        alt="landing3"
                    />
                </motion.div>
            </div>

        </div>
    )
}

