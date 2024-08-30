'use client'
import { motion } from 'framer-motion'

export default function Landing1() {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(180deg, #FEFEFE 0%, rgba(254, 254, 254, 0.00) 100%), url("/assets/intro/section1bg.png")`,
        backgroundColor: '#F0F2F6', // 폴백 배경색
        backgroundBlendMode: 'normal',
      }}
      className="relative flex h-screen min-h-screen w-full flex-col items-center justify-center snap-start overflow-hidden bg-opacity-50 bg-cover bg-no-repeat pt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.8,
        }}
        className="pt-[6.56rem]"
      >
        <h1
          className="text-center"
          style={{
            fontFamily: 'var(--font-museomoderno)',
            fontSize: '6.13rem', // 고정 크기
            fontWeight: '400',
          }}
        >
          Aurora
        </h1>
        <p
          className="text-center pt-4"
          style={{
            fontSize: '1.25rem', // 고정 크기
            color: '#6A6F7A',
          }}
        >
          세상은 복잡하고, 우리 주변에는 아직 해결되지 않은 수많은 문제들이 존재해요
          <br /> 만약 이러한 문제들을 바라만 보고 있었다면, 이제는 행동할 시간입니다.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.8,
        }}
        className="pt-20"
      >
        <motion.img
          src="/assets/intro/section1_float_btn.png"
          alt="Floating"
          animate={{
            y: [0, -10, 0], // 위아래로 움직이는 애니메이션
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 2.5,
          }}
          className="w-64 h-64 object-contain" // 고정 크기 이미지
        />
      </motion.div>
    </div>
  )
}
