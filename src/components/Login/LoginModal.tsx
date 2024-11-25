// components/LoginModal.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  // kakao_login
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
  const KAKAO_REDIRECT_URI = `${process.env.NEXT_PUBLIC_AURORA_REDIRECT_URL}/login/oauth2/callback/kakao`
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`

  // naver_login
  const NAVER_REST_API_KEY = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
  const NAVER_REDIRECT_URI = `${process.env.NEXT_PUBLIC_AURORA_REDIRECT_URL}/login/oauth2/callback/naver`
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_REST_API_KEY}&redirect_uri=${NAVER_REDIRECT_URI}&state=test`

  // google_login
  const GOOGLE_REST_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const GOOGLE_REDIRECT_URI = `${process.env.NEXT_PUBLIC_AURORA_REDIRECT_URL}/login/oauth2/callback/google`
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_REST_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`

  if (!isOpen) return null

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000] bg-opacity-40"
      onClick={handleBackgroundClick}
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
          <div className="flex flex-col items-center gap-[0.4rem] pt-3 w-[90%] max-w-[20rem]">
            <Link href={GOOGLE_AUTH_URL} className="w-full">
              <div className="flex h-[2.4rem] w-full flex-shrink-0 items-center justify-center relative rounded-[0.4rem] border-[0.5px] border-[#C1C1C1] bg-[#FFF]">
                <div className="absolute left-2">
                  <Image src={'/assets/login/googleLogo.svg'} width={18} height={18} alt="GoogleLogin" />
                </div>
                <span className="font-normal text-[0.75rem]">Google로 시작하기</span>
              </div>
            </Link>
            
            <Link href={KAKAO_AUTH_URL} className="w-full">
              <div className="flex h-[2.4rem] w-full flex-shrink-0 items-center justify-center relative rounded-[0.4rem] bg-[#FDDC3F]">
                <div className="absolute left-2">
                  <Image src={'/assets/login/kakaoLogo.svg'} width={30} height={42} alt="kakaoLogin" />
                </div>
                <span className="font-normal text-[0.75rem]">카카오로 시작하기</span>
              </div>
            </Link>

            <Link href={NAVER_AUTH_URL} className="w-full">
              <div className="flex h-[2.4rem] w-full flex-shrink-0 items-center justify-center relative rounded-[0.4rem] bg-[#04BF19]">
                <div className="absolute left-2">
                  <Image src={'/assets/login/naverLogo.svg'} width={30} height={35} alt="naverLogin" />
                </div>
                <p className="text-normal text-[0.75rem] text-white">네이버로 시작하기</p>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
