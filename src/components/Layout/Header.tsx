// Header.tsx
'use client'
import { useEffect, useState } from 'react'
import './Example.css'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import DropdownMenu from './HeaderModal'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { accessTokenState, authState } from '@/context/recoil-context'
import { Logout, RefreshAccessToken } from '@/lib/action'
import LoginModal from '../Login/LoginModal'
import PopUpAlertModal from '../common/CommonModal/PopUpAlertModal'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false) // 새로 추가된 상태
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

  // 조건부 렌더링을 JSX 내부로 옮김
  if (hiddenPaths.includes(pathname)) {
    return null
  }

  return (
    <>
      <nav className="fixed top-0 z-[20] w-full h-[5rem] flex-shrink bg-white backdrop-blur-3xl">
        <div className="flex w-full items-center justify-between px-[2.5rem] py-[1.3rem]">
          {/* 라우팅 링크 */}
          <div className="flex gap-[20rem] ml-[9.44rem]">
            <div className="flex">
              <Link href="/" className="-m-1.5 p-1.5">
                <div className="relative h-[33px] w-[112px]">
                  <Image src="/assets/colorLogo.svg" fill style={{ objectFit: 'contain' }} alt="logo" />
                </div>
              </Link>
            </div>
            <div className="hidden gap-[5.19rem] lg:flex lg:flex-1 lg:items-center lg:justify-between">
              <Link href="/chat" className="font-medium leading-5 text-grey90 hover:text-main">
                오로라 채팅하기
              </Link>
              <Link href="/idea/note" className="font-medium leading-5 text-grey90 hover:text-main">
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

          <div className="flex gap-[1.44rem] items-center">
              <Link href="/search" className="hidden text-sm font-medium leading-5 text-grey80 lg:flex">
                <img src="/assets/icons/search_icon.svg" alt="search" />
              </Link>
              <Link href="/setting" className="hidden text-sm font-medium leading-5 text-grey80 lg:flex">
                <img src="/assets/icons/my_profile_icon.svg" alt="setting" />
              </Link>
          </div>

          <div className="ml-auto flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex cursor-pointer items-center justify-center rounded-md p-2.5 text-grey100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`mobile-menu transition-max-height absolute w-full duration-500 ease-in-out ${
            mobileMenuOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <Link href="/myResume" className="block p-4 pl-8 text-sm font-semibold leading-6 text-grey100">
            오로라 채팅하기
          </Link>
          <Link href="#" className="block p-4 pl-8 text-sm font-semibold leading-6 text-grey100">
            아이디어 노트
          </Link>
          <Link href="#" className="block p-4 pl-8 text-sm font-semibold leading-6 text-grey100">
            프로젝트 갤러리
          </Link>
          <Link href="#" className="block p-4 pl-8 text-sm font-semibold leading-6 text-grey100">
            마이페이지
          </Link>
          <div onClick={handleLogout} className="block p-4 pl-8 text-sm font-semibold leading-6 text-[#FF345F]">
            로그아웃
          </div>
        </div>
      </nav>
    </>
  )
}
