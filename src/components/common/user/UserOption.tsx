import { accessTokenState } from '@/context/recoil-context'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { PostIFormData } from '@/lib/types'

interface UserOptionProps {
  onClose: () => void
  onShowConfirmModal: (userName: string) => void
}

interface IUserData extends PostIFormData {
  email: string
}

export default function UserOption({ onClose, onShowConfirmModal }: UserOptionProps) {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [userData, setUserData] = useState<IUserData>({ memberName: '', contact: '', email: '', marketingAgree: false })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [accessToken, onClose])

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleShowConfirmModal = () => {
    onShowConfirmModal(userData.memberName)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-[#000] bg-opacity-50 text-grey90"
      onClick={handleClickOutside}
    >
    </div>
  )
}
