// Landing1.tsx
'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { floatingAnimation, mainHoverEffect } from '@/lib/animations'

export default function Landing1() {
    return (
      <div
        // style={{ backgroundImage: 'url("/assets/intro/section3bg.png")' }}
        className="relative flex h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-col items-center justify-center overflow-hidden overflow-x-auto bg-[#F0F2F6] bg-opacity-50 bg-cover bg-no-repeat"
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
          <h1 className="text-center text-[3.375rem] font-bold text-main">
            Aurora
          </h1>
          <p className="text-center pt-4 text-[1.1875rem] text-grey70">
            세상은 복잡하고, 우리 주변에는 아직 해결되지 않은 수많은 문제들이 존재해요
            <br /> 만약 이러한 문제들을 바라만 보고 있었다면, 이제는 행동할 시간입니다.
          </p>
        </motion.div>
      </div>
    )
  }
  