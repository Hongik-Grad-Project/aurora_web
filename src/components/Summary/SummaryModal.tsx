'use client'

import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { accessTokenState, selectedChatRoomIdState } from '@/context/recoil-context'
import Link from 'next/link'

interface SummaryModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function SummaryModal({ isOpen, onClose }: SummaryModalProps) {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState);

    if (!isOpen) return null

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    const handleNo = async () => {
        onClose();
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000] bg-opacity-50"
            onClick={handleBackgroundClick}
        >
            <motion.div
                initial={{ y: '5vh', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100vh', opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg max-w-[400px] w-full"
            >
                <h1 className="flex flex-col items-center justify-center text-center text-xl font-semibold text-gray-800 mb-8">AI로 문서 초안을<br/>작성하시겠습니까?</h1>
                <div className="flex w-full justify-center gap-[1.5rem] px-2">
                    <div className="flex-1">
                        <button
                            onClick={handleNo}
                            className="w-full h-12 justify-center items-center rounded-lg bg-[#E2E8F0] text-[#1E2A3B] font-semibold hover:bg-[#9DA1AD] transition-colors"
                        >
                            아니오
                        </button>
                    </div>

                    <div className="flex-1">
                        <Link href={`/project/outline/summarized`}>
                            <button
                                onClick={onClose}
                                className="w-full h-12 justify-center items-center rounded-lg bg-[#776BFF] text-white font-semibold hover:bg-[#AEA0FF] transition-colors"
                            >
                                예
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
