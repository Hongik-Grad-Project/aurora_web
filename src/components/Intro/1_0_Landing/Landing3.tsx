'use client'
import Image from 'next/image'
import { motion } from "framer-motion";

export default function Landing3() {
    return (
        <div className="relative flex justify-center h-screen min-h-screen
        w-full snap-mandatory snap-start snap-always flex-row 
        overflow-hidden bg-[#FFFFFF] bg-cover bg-no-repeat pt-[3rem]
        md:pt-[5rem]">

            <div className="flex w-full flex-col md:flex-row justify-center
            md:justify-between items-start px-4 md:px-8 lg:pr-[3.19rem]
            lg:pl-[6.87rem] gap-[3rem]">
                {/* 왼쪽 텍스트 섹션 */}
                <motion.div
                    className="inline-flex flex-col items-start gap-[1.1875rem] mt-[4rem] md:mt-[15.03rem]" // 모바일에서의 간격을 좁게 설정
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8 }} // 애니메이션 속도를 0.8로 설정
                >
                    <div className="flex flex-col items-start gap-[0.375rem]">
                        <motion.div
                            className="text-[#475569] text-[1rem] md:text-[1.25rem] font-medium leading-[1.875rem] opacity-80"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8 }} // 동일한 애니메이션 속도 적용
                        >
                            해결하기 어려운 세상의 다양한 문제들
                        </motion.div>
                        <motion.h1
                            className="text-[#0F1A2A] text-[1.875rem] md:text-[2.625rem] font-bold leading-[2.625rem] md:leading-[3.625rem]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }} // 동일한 애니메이션 속도 적용
                        >
                            우리에게 필요한 건<br className="block md:hidden" /> 문제를 간파해내는 능력
                        </motion.h1>
                    </div>
                    <motion.div
                        className="text-[#475569] text-[1rem] md:text-[1.25rem] font-medium leading-[1.5rem] md:leading-[1.875rem] opacity-80"
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }} // 동일한 애니메이션 속도 적용
                    >
                        지속적인 환경 파괴, 끊이지 않는 사회적 불평등 이런 것들을
                        <br />
                        어떻게 해결할 수 있을까요?
                        <br className="block md:hidden"/>어떻게 하면 세상에 작은 변화를 만들어낼 수 있을까요?
                    </motion.div>
                </motion.div>

                {/* 오른쪽 이미지 섹션 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }} // 애니메이션 속도를 동일하게 설정
                    className="mt-[1.5rem] md:mt-[15.69rem] mx-auto md:mx-0" // 모바일 간격을 더 줄임
                >
                    <Image
                        src={'/assets/intro/section3bubble.png'}
                        width={300} // 모바일 크기
                        height={192} // 모바일 크기
                        alt="landing3"
                        className="md:w-[589px] md:h-[378px]" // 데스크톱 크기
                    />
                </motion.div>
            </div>
        </div>
    )
}
