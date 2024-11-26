'use client'
import { authState, accessTokenState } from '@/context/recoil-context'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { motion } from 'framer-motion'
import MarketingConsentModal from './MarketingConsentModal'

const KakaoRedirect: React.FC = () => {
  const params = useSearchParams()
  const code = params.get('code')
  const router = useRouter()
  const [isAuth, setIsAuth] = useRecoilState(authState)
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const [loading, setLoading] = useState(true)
  const [showMarketingModal, setShowMarketingModal] = useState(false)

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/login/kakao`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          credentials: 'include',
          body: JSON.stringify({ code }),
        })
        if(response.ok) {
          const responseData = await response.json()
          setAccessToken(responseData.accessToken)
          setShowMarketingModal(true)
        }
      } catch (error) {
        console.error('Kakao login failed:', error)
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    if (code) {
      kakaoLogin()
    }
  }, [code, router, setIsAuth, setAccessToken])

  return loading ? (
    <div className="flex h-screen flex-col items-center justify-center">
      <motion.div
        className="border-t-blue-500 border-blue-200 h-12 w-12 animate-spin rounded-full border-4"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
      <p className="mt-4 text-lg">Loading...</p>
    </div>
  ) : (
    <>
      {showMarketingModal && accessToken && (
        <MarketingConsentModal 
          accessToken={accessToken}
          onClose={() => {
            setShowMarketingModal(false)
            router.push('/')
          }}
          onSubmit={async (consent: boolean) => {
            setShowMarketingModal(false)
            router.push('/')
          }}
        />
      )}
    </>
  )
}

export default KakaoRedirect
