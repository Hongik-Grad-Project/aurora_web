'use client'
import { accessTokenState, authState, emailState } from '@/context/recoil-context'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { motion } from 'framer-motion'

const GoogleRedirect: React.FC = () => {
    const params = useSearchParams()
    const code = params.get('code')
    const router = useRouter()
    const [toEmail, setToEmail] = useRecoilState(emailState)
    const [isAuth, setIsAuth] = useRecoilState(authState)
    const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const googleLogin = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/login/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            credentials: 'include',
            body: JSON.stringify({ code }),
          })
          if (response.ok) {
            const responseData = await response.json()
            setAccessToken(responseData.accessToken)
            setToEmail(responseData.email)
            // setIsAuth(true)
  
            if (responseData.existMemberBasicInform === true && responseData.existDefaultProfile === true) {
              router.push('/')
            } else if (responseData.existMemberBasicInform === true && responseData.existDefaultProfile === false) {
              router.push(`/onBoarding/select`)
            } else {
              router.push(`/onBoarding`)
            }
          }
        } catch (error) {
        } finally {
          setLoading(false)
        }
      }
      googleLogin()
    }, [code, router, setToEmail, setIsAuth, setAccessToken])
  
    return loading ? (
      <div className="flex h-screen flex-col items-center justify-center">
        <motion.div
          className="border-t-blue-500 border-blue-200 h-12 w-12 animate-spin rounded-full border-4"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    ) : null
  }
  
  export default GoogleRedirect
  