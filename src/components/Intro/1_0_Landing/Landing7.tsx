'use client'
import Image from 'next/image'
import { motion } from "framer-motion";

export default function Landing7() {
    return (
        <div className="relative flex justify-center h-screen 
        min-h-screen w-full pl-[6.88rem] pr-[7.88rem] snap-mandatory 
        snap-start snap-always flex-row overflow-hidden overflow-x-auto 
        bg-cover bg-no-repeat pt-[5rem]"
            style={{
                background: 'linear-gradient(180deg, #FFF 0%, #E2DDFF 100%)',
            }}
        >
            <div className="flex w-full flex-row justify-between items-start gap-[1.19rem]">
                <motion.div
                    className="inline-flex flex-col items-start gap-[1.1875rem] mt-[9.03rem]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <div className="flex flex-col items-start">
                        <motion.div
                            className="flex text-[1.25rem] text-[#475569] mb-[0.38rem]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                        >
                            사람을 모으자
                        </motion.div>
                        <motion.h1
                            className="text-[2.625rem] text-[#0F1A2A] font-bold mb-[1.19rem]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.4 }}
                        >
                            이제 행동으로
                            <br />
                            옮길 일만 남았어요
                        </motion.h1>
                    </div>
                    <motion.div
                        className="text-[#475569] text-[1.25rem] font-medium leading-[1.875rem]"
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                    >
                        내가 구체화한 프로젝트를 소개하고 홍보해보세요.
                        <br />
                        아이디어에 공감하는 사람들이 모여 직접 해결할 수 있는 힘을 만들어드려요
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 1,
                        duration: 1.0,
                    }}
                    className="flex w-[31.8125rem] h-[29.5625rem] pt-[1.25rem] px-[2.875rem] pb-[6.86225rem] justify-center items-center mt-[3.75rem]"
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
                                        <img
                                            src="/assets/intro/section7_small_fire.png"
                                            alt="Your Image"
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