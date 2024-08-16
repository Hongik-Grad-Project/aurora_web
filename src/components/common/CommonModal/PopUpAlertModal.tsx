'use client'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface PopUpAlertModalProps {
  isOpen: boolean
  onClose: () => void
  text: string
  onYes: () => void // 예 버튼 클릭 시 호출될 함수
  onNo: () => void // 아니오 버튼 클릭 시 호출될 함수
}

export default function PopUpAlertModal({ isOpen, onClose, text, onYes, onNo }: PopUpAlertModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const modalContent = document.querySelector('.modal-content')
      if (modalContent && !modalContent.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="modal-content w-[19.8125rem] rounded-lg bg-white p-[1rem] shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <div className="flex justify-center pt-3">
          <h2 className="font-semibold text-grey100">{text}</h2>
        </div>
        <div className="mt-7 flex flex-row w-full justify-center space-x-4">
          <button
            className="flex p-[0.82156rem_0rem_0.80344rem_0rem] justify-center items-center flex-[1_0_0] rounded-[0.5rem] bg-[#E2E8F0] text-white"
            onClick={onNo}
          >
            <div className="text-center text-[#1E2A3B] font-medium text-[1rem] leading-[1.5rem]">
              아니오
            </div>
          </button>
          <button
            className="flex p-[0.82156rem_0rem_0.80344rem_0rem] justify-center items-center flex-[1_0_0] rounded-[0.5rem] bg-[#776BFF] text-white"
            onClick={onYes}
          >
            <div className="text-center text-[#FFF] font-medium text-[1rem] leading-[1.5rem]">
              예
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
