'use client'
import Image from 'next/image'
import { motion } from "framer-motion";

export default function Landing7() {
    return (
        <div className="relative flex justify-center items-center h-screen min-h-screen
        w-full snap-mandatory snap-start snap-always flex-col md:flex-row 
        overflow-hidden bg-[#FFFFFF] bg-cover bg-no-repeat pt-[3rem]
        md:pt-[5rem]"style={{
                background: 'linear-gradient(180deg, #FFF 0%, #E2DDFF 100%)',
            }}>
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
                            프로젝트를 스스로 검증하기 어려웠나요?
                        </motion.div>
                        <motion.h1
                            className="text-center text-[#0F1A2A] text-[1.875rem] md:text-[2.625rem] font-bold leading-[2.625rem] md:leading-[3.625rem]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.4 }}
                        >
                            공감하는 사람들에게 응원받아요
                        </motion.h1>
                    </div>
                    <motion.div
                        className="text-center text-[#475569] text-[1rem] md:text-[1.25rem] font-medium leading-[1.5rem] md:leading-[1.875rem] opacity-80"
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                    >
                        내 프로젝트를 응원하고 지켜보는 사람들이 있어요!
                    </motion.div>
                </motion.div>

                <motion.div
                    className="flex-1 order-last md:order-none" // 모바일에서는 첫 번째로, 데스크톱에서는 순서 없음
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <div
                        className="flex w-[26.0625rem] h-[20.4375rem] justify-center items-end"
                        style={{
                            backgroundImage: 'url(/assets/intro/section7_fire.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <button className="inline-flex py-[3.125rem] px-[1.25rem] flex-col justify-center items-center gap-[1.56969rem] rounded-[3.125rem] border border-[#E2E6EF] bg-white shadow-[17px_27px_90px_0px_#CECAFF] transform transition-transform duration-200 hover:scale-105">
                            <div className="flex flex-col justify-center items-center gap-[0.65406rem] self-stretch">
                                <div className="flex w-[14.78125rem] h-[6.67118rem] justify-center items-center rounded-[3.92425rem] border-[2.093px] border-[#E2E6EF] bg-[#FEFEFE]">
                                    <div className="flex flex-row justify-center gap-[1.57rem]">
                                        <Image
                                            src="/assets/intro/section7_small_fire.png"
                                            alt="Your Image"
                                            width={50} // 적절한 width 값을 지정
                                            height={60} // 적절한 height 값을 지정
                                            className="flex w-[3.13938rem] h-[4.0355rem] justify-center items-center flex-shrink-0 mt-[0.27rem]"
                                        />
                                        <span
                                            className="flex w-[4.44746rem] h-[4.97069rem] justify-center items-center text-[#0F1011] text-[2.48531rem] font-bold leading-[3.728rem]"
                                        >
                                            105
                                        </span>
                                    </div>
                                </div>
                                <span
                                    className="text-[#0F1011] text-center text-[2.09294rem] font-semibold leading-[3.13938rem] self-stretch"
                                >
                                    응원하기
                                </span>
                            </div>
                        </button>
                    </div>
                </motion.div>
            </div >
        </div >
    )
}
