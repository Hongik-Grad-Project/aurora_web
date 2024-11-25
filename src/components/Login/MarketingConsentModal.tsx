// components/LoginModal.tsx
'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface MarketingConsentModalProps {
  onClose: () => void;
  onSubmit: (consent: boolean) => Promise<void>;
}

export default function MarketingConsentModal({ onClose, onSubmit }: MarketingConsentModalProps) {

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000] bg-opacity-40"
    >
      <motion.div
        initial={{ y: '5vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100vh', opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[90%] max-w-[24rem] h-auto min-h-[20rem] flex-shrink-0 rounded-[1rem] bg-[#FFF] pb-[2rem] pt-[1.5rem]"
      >
        <div className="flex flex-col items-center">
          <Image src="/assets/colorLogo.svg" width={130} height={43} alt="logo" />
          <div className="flex flex-col flex-start w-[90%] max-w-[20rem] mt-[1.2rem]">
            <div
              className="text-[#0F1011] text-[0.9rem] font-bold leading-[1.3rem]"
            >
              회원가입하기
            </div>
            <div
              className="text-[#0F1011] text-[0.7rem] font-medium leading-[1rem] mb-[1rem]"
            >
              소셜 로그인 및 이메일로 가입할 수 있습니다.
            </div>
            <div className="w-full h-0 flex-shrink-0 border-t-[0.5px] border-[#CDCDCD]"></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
