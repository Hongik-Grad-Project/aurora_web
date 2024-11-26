'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Logout } from '@/lib/action'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { accessTokenState, authState } from '@/context/recoil-context'
// import AccountModal from '../common/user/AccountModal'

const DropdownMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isAuth, setIsAuth] = useRecoilState(authState)
  const [token, setToken] = useRecoilState(accessTokenState)
  const resetAccessTokenState = useResetRecoilState(accessTokenState)

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('click', handleOutsideClick)
    } else {
      document.removeEventListener('click', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [dropdownOpen])

  const handleLogout = async () => {
    if (!token) return
    try {
      const response = await Logout(token)
      setIsAuth(false)
      resetAccessTokenState()
      window.location.href = '/'

    } catch (error) {
      console.error('Failed to logout', error)
    }
  }

  const handleSettingClick = () => {
    setModalOpen(true)
    setDropdownOpen(false)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="hidden cursor-pointer text-sm font-medium leading-5 text-grey80 lg:flex"
      >
        <Image src="/assets/icons/my_profile_icon.svg" alt="mypage" width={25} height={25} />
      </div>
      {dropdownOpen && (
        <div className="absolute right-[-20px] mt-7 flex w-[7.93rem] flex-col items-center rounded-md bg-[#fff] text-center shadow-lg ring-1 ring-grey40 ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={handleLogout}
              className="text-gray-700 block cursor-pointer px-4 py-2 text-sm"
              role="menuitem">
                로그아웃
            </button>
            <button onClick={handleLogout} className="block w-full py-2 text-sm text-[#FF345F]" role="menuitem">
              회원탈퇴
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
