'use client'
import { motion } from 'framer-motion'

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
        <div className="bg-white rounded-lg p-4 lg:p-8 shadow-lg w-[85%] lg:w-[500px]">
          <p className="text-center text-sm lg:text-lg text-gray-700">
            구글폼QR
          </p>
        </div>

        <div className="text-center mt-2 lg:mt-4">
          <p className="text-gray-600 text-xs lg:text-sm mb-1 lg:mb-2">
            링크(for 피드백&리크루팅)
          </p>
          <p className="text-gray-500 text-[10px] lg:text-xs">
            설문에 응답해주시는 분들께 ~를 드린다
          </p>
        </div>
      </motion.div>
    </div>
  )
}
