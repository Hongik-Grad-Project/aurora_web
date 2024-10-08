'use client'

import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
  text?: string;
}

export default function LoadingSkeleton({text = "로딩 중입니다"}: LoadingSkeletonProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      {/* 로딩 스피너 */}
      <div className="flex flex-col items-center justify-center">
        <motion.svg
          className="h-12 w-12 text-indigo-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
          }}
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </motion.svg>

        {/* 로딩 텍스트 */}
        <div className="mt-6 text-center">
          <p className="text-2xl font-medium text-gray-500">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}
