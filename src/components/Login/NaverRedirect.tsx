'use client'
import { accessTokenState, authState, emailState } from '@/context/recoil-context'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { motion } from 'framer-motion'

// 카카오 로그인 후 서버에 전송할 코드를 받아오는 페이지
const NaverRedirect: React.FC = () => {
  const params = useSearchParams()
  const code = params.get('code')
  const router = useRouter()
  const [toEmail, setToEmail] = useRecoilState(emailState)
  const [isAuth, setIsAuth] = useRecoilState(authState)
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)

  useEffect(() => {
    const naverLogin = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/login/naver`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          credentials: 'include',
          body: JSON.stringify({ code }),
        })
        if(response.ok) {
          const responseData = await response.json()
          setAccessToken(responseData.accessToken)
        }
      } catch (error) {
      } finally {
        router.push('/')
      }
    }
    naverLogin()
  }, [code, setAccessToken, router])

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <motion.div
        className="border-t-blue-500 border-blue-200 h-12 w-12 animate-spin rounded-full border-4"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
      <p className="mt-4 text-lg">Loading...</p>
    </div>
  )
}

export default NaverRedirect
