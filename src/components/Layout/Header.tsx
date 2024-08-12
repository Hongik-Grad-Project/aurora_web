'use client'
import { useEffect, useState } from 'react'
import './Example.css'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { accessTokenState, authState } from '@/context/recoil-context'
import { Logout, RefreshAccessToken } from '@/lib/action'
import LoginModal from '../Login/LoginModal'

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const router = useRouter()
  const [token, setToken] = useRecoilState(accessTokenState)
  const resetAccessTokenState = useResetRecoilState(accessTokenState)
  const [isAuth, setIsAuth] = useRecoilState(authState)
  const pathname = usePathname()

  const hiddenPaths = [
    '/onBoarding/select',
    '/onBoarding/person/project',
    '/onBoarding/person/role',
    '/onBoarding/person/school',
    '/onBoarding/person/location',
    '/onBoarding/person/career',
    '/onBoarding/person/profile',
    '/onBoarding/team/teamCategory',
    '/onBoarding/team/activityWay',
    '/onBoarding/team/member',
    '/onBoarding/team/profile',
    '/onBoarding/complete',
    '/onBoarding',
  ]

  useEffect(() => {
    if (hiddenPaths.includes(pathname)) return
    if (!token || token === 'undefined') return

    RefreshAccessToken(token)
      .then((response) => {
        if (response.existMemberBasicInform === false) {
          router.push('/onBoarding')
        } else if (response.existDefaultProfile === false) {
          router.push('/onBoarding/select')
        }

        if (response.existMemberBasicInform && response.existDefaultProfile) {
          setToken(response.accessToken)
          setIsAuth(true)
        }

        if (response.code === 9103) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.')
          setIsAuth(false)
          setToken(null)
          router.push('/')
        }
      })
      .catch((error) => {
        if (error.code === 9103) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.')
          setIsAuth(false)
          router.push('/')
        }
      })
  }, [router, setToken, setIsAuth, token, pathname, hiddenPaths])

  const handleLogout = async () => {
    if (!token) return

    try {
      const response = await Logout(token)
      if (response.ok) {
        setIsAuth(false)
        resetAccessTokenState()
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Failed to logout', error)
    }
  }

  if (hiddenPaths.includes(pathname)) {
    return null
  }

  return (
    <>
      <nav className="fixed top-0 z-[20] w-full flex-shrink bg-white backdrop-blur-3xl">
        <div className="flex w-full items-center justify-between px-[2.5rem] py-[1.3rem]">
          <div className="flex gap-[2.19rem]">
            <div className="flex">
              <Link href="/" className="-m-1.5 p-1.5">
                <div className="relative h-[33px] w-[112px]">
                  <Image src="/assets/colorLogo.svg" fill style={{ objectFit: 'contain' }} alt="logo" />
                </div>
              </Link>
            </div>
            <div className="hidden gap-[1.88rem] md:flex md:items-center md:justify-between lg:flex-1">
              <Link
                href="/chat"
                className="font-medium leading-5 text-grey90 hover:text-main">
                오로라 채팅하기
              </Link>
              <Link href="/idea_note" className="font-medium leading-5 text-grey90 hover:text-main">
                아이디어 노트
              </Link>
              <Link href="/gallery" className="font-medium leading-5 text-grey90 hover:text-main">
                프로젝트 갤러리
              </Link>
              <Link href="/mypage" className="font-medium leading-5 text-grey90 hover:text-main">
                마이페이지
              </Link>
            </div>
          </div>

          <div className="flex flex-1 justify-end gap-10">
            {isAuth ? (
              <>
                <Link href="/search" className="hidden font-medium leading-5 text-grey80 lg:flex">
                  <img src="/assets/icons/search_icon.svg" alt="search" />
                </Link>
                <Link
                  href="/mypage"
                  className="hidden text-sm font-medium leading-5 text-grey80 hover:text-main lg:flex">
                  <img src="/assets/icons/my_profile_icon.svg" alt="mypage" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/search"
                  className="hidden text-sm font-medium leading-5 text-grey80 lg:flex">
                  <img src="/assets/icons/search_icon.svg" alt="search" />
                </Link>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="hidden text-sm font-medium leading-5 text-grey80 hover:text-main lg:flex"
                >
                  <img src="/assets/icons/my_profile_icon.svg" alt="setting" />
                </button>
              </>
            )
            }
          </div>
        </div>
      </nav>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}
