'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Landing1() {
  return (
    <div
      style={{
        backgroundImage: `url("/assets/intro/section1bg.png")`,
        backgroundColor: '#F0F2F6',
        backgroundBlendMode: 'normal',
      }}
      className="relative flex h-screen min-h-screen w-full flex-col items-center justify-center snap-start overflow-hidden bg-cover bg-no-repeat"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.8,
        }}
        className="flex flex-col items-center gap-4 w-full px-4"
      >
        <div className="text-center mb-2 lg:mb-2">
          <p className="text-gray-800 text-xs sm:text-base md:text-lg lg:text-xl mb-2">
            오로라의 사용 후기와 피드백을 자유롭게 남겨주세요.
          </p>
          <p className="text-gray-600 text-[11px] sm:text-sm md:text-base lg:text-lg">
            <span className="hidden max-[320px]:inline">설문에 응답해 주시는 분들 중 추첨을 통해<br /></span>
            <span className="hidden max-[320px]:inline">스타벅스 기프티콘을 드립니다.</span>
            <span className="inline max-[320px]:hidden">설문에 응답해 주시는 분들 중 추첨을 통해 스타벅스 기프티콘을 드립니다.</span>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg w-[200px] sm:w-[220px] md:w-[230px] lg:w-[250px]">
          <div className="relative w-full aspect-square">
            <Image
              src="/assets/intro/aurora_qr.jpeg"
              alt="Google Form QR Code"
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
