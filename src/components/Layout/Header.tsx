'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { accessTokenState, authState } from '@/context/recoil-context'
import { Logout, RefreshAccessToken } from '@/lib/action'
import LoginModal from '../Login/LoginModal'
import { motion } from 'framer-motion'
import DropDownMenu from './HeaderModal'

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isProfileButtonDropdown, setIsProfileButtonDropdown] = useState(false)
  const router = useRouter()
  const [token, setToken] = useRecoilState(accessTokenState)
  const resetAccessTokenState = useResetRecoilState(accessTokenState)
  const [isAuth, setIsAuth] = useRecoilState(authState)
  const pathname = usePathname()

  const dropdownRef = useRef<HTMLDivElement>(null) // 드롭다운을 참조하는 ref

  const hiddenPaths = [
    'project/idea',
    'project/outline',
    'project/body',
    'project/gallery'
  ]

  useEffect(() => {
    if (hiddenPaths.includes(pathname)) return
    if (!token || token === 'undefined') return

    RefreshAccessToken(token)
      .then((response) => {
        if (response.code === 9103) {
          setIsAuth(false)
          setToken(null)
          setIsLoginModalOpen(true) // 세션 만료 시 로그인 모달 열기
        } else {
          setToken(response.accessToken)
          setIsAuth(true)
        }
      })
      .catch((error) => {
        if (error.code === 9103) {
          setIsAuth(false)
          setIsLoginModalOpen(true) // 세션 만료 시 로그인 모달 열기
        }
      })
  }, [router, setToken, setIsAuth, token, pathname, hiddenPaths])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

  // 마이페이지 클릭 핸들러
  const handleMyPageClick = () => {
    if (!isAuth) {
      setIsLoginModalOpen(true); // 로그인 모달을 띄움
    } else {
      router.push('/mypage'); // 마이페이지로 이동
    }
  }

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

  // 드롭다운 바깥을 클릭했을 때 닫히도록 설정
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  if (hiddenPaths.includes(pathname)) {
    return null
  }

  return (
    <>
      <nav className="fixed top-0 z-[20] w-full flex-shrink bg-white backdrop-blur-3xl">
        <div className="flex w-full items-center justify-between px-[2.5rem] py-[18.5px]">
          <div className="flex gap-[2.19rem]">
            <div className="flex">
              <Link href="/">
                <div className="relative h-[33px] w-[112px]">
                  <Image src="/assets/colorLogo.svg" fill style={{ objectFit: 'contain' }} alt="logo" />
                </div>
              </Link>
            </div>
            <div className="hidden lg:flex gap-[1.88rem] items-center justify-between flex-1">
              {/* 프로젝트 기획 탭 */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="font-medium leading-5 text-grey90 hover:text-main flex items-center gap-1"
                >
                  프로젝트 기획
                </button>

                {/* 드롭다운 메뉴 */}
                {isDropdownOpen && (
                  <motion.div
                    className="absolute mt-1 bg-white shadow-lg rounded-lg w-[150px] py-4 dropdown-content"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="flex flex-col space-y-2 items-center">
                      {/* 각 Link를 div로 감싸고 hover 효과 추가 */}
                      <div className="hover:bg-[#E1DCFF] rounded-md">
                        <Link href="/chat" className="block font-medium leading-5 text-grey90 hover:text-main px-4 py-2">
                          오로라 채팅하기
                        </Link>
                      </div>
                      <div className="hover:bg-[#E1DCFF] rounded-md">
                        <Link href="/project/idea" className="block font-medium leading-5 text-grey90 hover:text-main px-4 py-2">
                          아이디어 노트
                        </Link>
                      </div>
                      <div className="hover:bg-[#E1DCFF] rounded-md">
                        <Link href="/project/outline" className="block font-medium leading-5 text-grey90 hover:text-main px-4 py-2">
                          기획서 생성
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <Link href="/project/gallery" className="font-medium leading-5 text-grey90 hover:text-main text-right">
                프로젝트 갤러리
              </Link>
              <button onClick={handleMyPageClick} className="font-medium leading-5 text-grey90 hover:text-main text-right">
                마이페이지
              </button>
            </div>
          </div>

          <div className="flex lg:hidden">
            {/* 모바일 햄버거 메뉴 */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex flex-1 justify-end gap-10">
            {isAuth ? (
              // 로그인 상태
              <>
                <Link href="/search" className="font-medium leading-5 text-grey80">
                  <Image src="/assets/icons/search_icon.svg" alt="search" width={25} height={25} />
                </Link>
                <DropDownMenu />
              </>
            ) : (
              // 로그인 이전 보여질 버튼
              <>
                <Link href="/search" className="font-medium leading-5 text-grey80">
                  <Image src="/assets/icons/search_icon.svg" alt="search" width={24} height={24} />
                </Link>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-sm font-medium leading-5 text-grey80 hover:text-main"
                >
                  <Image src="/assets/icons/my_profile_icon.svg" alt="setting" width={24} height={24} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-[200px] py-4 px-6"
          >
            <div className="flex flex-col items-end space-y-2">
              <Link href="/chat" className="font-medium leading-5 text-grey90 hover:text-main text-right">
                오로라 채팅하기
              </Link>
              <Link href="/project/idea" className="font-medium leading-5 text-grey90 hover:text-main text-right">
                아이디어 노트
              </Link>
              <Link href="/project/gallery" className="font-medium leading-5 text-grey90 hover:text-main text-right">
                프로젝트 갤러리
              </Link>
              <Link href="/mypage" className="font-medium leading-5 text-grey90 hover:text-main text-right">
                마이페이지
              </Link>
              {isAuth ? (
                <button onClick={handleLogout} className="font-medium leading-5 text-grey90 hover:text-main text-right">
                  로그아웃
                </button>
              ) : (
                <button onClick={() => setIsLoginModalOpen(true)} className="font-medium leading-5 text-grey90 hover:text-main text-right">
                  로그인
                </button>
              )}
            </div>
          </motion.div>
        )}
      </nav>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}
