'use client'
import Image from 'next/image'
import { motion } from "framer-motion";

export default function Landing3() {
    return (
        <div className="relative flex justify-center items-center h-screen min-h-screen
        w-full snap-mandatory snap-start snap-always flex-col md:flex-row 
        overflow-hidden bg-[#FFFFFF] bg-cover bg-no-repeat pt-[3rem]
        md:pt-[5rem]">
            <div className="flex w-full flex-col md:flex-row justify-center items-center md:justify-between gap-[3rem]">
                {/* 왼쪽 텍스트 섹션 */}
                <motion.div
                    className="flex-1 flex flex-col items-center gap-[1.1875rem]" // 중앙 정렬 및 flex-1 적용
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
                        해결하기 어려운 세상의 다양한 문제들
                    </motion.div>
                    <motion.h1
                        className="text-center text-[#0F1A2A] text-[1.875rem] md:text-[2.625rem] font-bold leading-[2.625rem] md:leading-[3.625rem]"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        우리에게 필요한 건<br className="block md:hidden" /> 문제를 간파해내는 능력
                    </motion.h1>
                    <motion.div
                        className="text-center text-[#475569] text-[1rem] md:text-[1.25rem] font-medium leading-[1.5rem] md:leading-[1.875rem] opacity-80"
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        지속적인 환경 파괴, 끊이지 않는 사회적 불평등 이런 것들을
                        <br />
                        어떻게 해결할 수 있을까요?
                        <br className="block md:hidden"/>어떻게 하면 세상에 작은 변화를 만들어낼 수 있을까요?
                    </motion.div>
                </motion.div>

                {/* 오른쪽 이미지 섹션 */}
                <motion.div
                    className="flex-1 order-last md:order-none" // 모바일에서는 첫 번째로, 데스크톱에서는 순서 없음
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <Image
                        src={'/assets/intro/section3bubble.png'}
                        width={589} // 데스크톱 크기 조정
                        height={378} // 데스크톱 크기 조정
                        alt="landing3"
                        className="mx-auto" // 이미지 중앙 정렬
                    />
                </motion.div>
            </div>
        </div>
    )
}
