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
        className="w-[31.5rem] h-[21.25rem] flex-shrink-0 rounded-[1.875rem] bg-[#FFF] pb-[4.32rem] pt-[2.59rem]"
      >
        <div className="flex flex-col items-center">
          <Image src="/assets/colorLogo.svg" width={172} height={57} alt="logo" />
          <div className="flex flex-col flex-start w-[23.6335rem] mt-[2.35rem]">
            <div
              className="text-[#0F1011] text-[1.25rem] font-bold leading-[1.875rem]"
            >
              회원가입하기
            </div>
            <div
              className="text-[#0F1011] text-[0.875rem] font-medium leading-[1.3125rem] mb-[1.93rem]"
            >
              소셜 로그인 및 이메일로 가입할 수 있습니다.
            </div>
            <div className="w-[23.3475rem] h-0 flex-shrink-0 border-t-[0.598px] border-[#CDCDCD]"></div>
          </div>
          <div className="flex flex-col items-center gap-2 pt-6">
            {/* <Link href={GOOGLE_AUTH_URL}>
              <div className="flex h-[2.64825rem] w-[23.6335rem] flex-shrink-0 pl-[0.82rem] cursor-pointer items-center gap-[6.13rem] rounded-[0.5rem] border-[0.598px] border-[#C1C1C1] bg-[#FFF]">
                <Image src={'/assets/login/googleLogo.svg'} width={23} height={23} alt="GoogleLogin" />
                <span className="font-normal text-[0.875rem]">Google로 시작하기</span>
              </div>
            </Link>
            
            <Link href={KAKAO_AUTH_URL}>
              <div className="flex h-[3.30606rem] w-[23.6335rem] flex-shrink-0 pl-[0.44rem] cursor-pointer items-center gap-[6.04rem] rounded-[0.5rem] bg-[#FDDC3F]">
                <Image src={'/assets/login/kakaoLogo.svg'} width={39} height={56} alt="kakaoLogin" />
                <span className="font-normal text-[0.875rem]">카카오로 시작하기</span>
              </div>
            </Link> */}

            <Link href={NAVER_AUTH_URL}>
              <div className="flex h-[3.30606rem] w-[23.6335rem] flex-shrink-0 pl-[0.44rem] cursor-pointer items-center gap-[6.04rem] rounded-[0.5rem] bg-[#04BF19]">
                <Image src={'/assets/login/naverLogo.svg'} width={39} height={44} alt="naverLogin" />
                <p className="text-normal text-[0.875rem] text-white">네이버로 시작하기</p>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
