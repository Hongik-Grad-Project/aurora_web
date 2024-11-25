'use client'

import { motion } from 'framer-motion'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { accessTokenState, selectedSummaryRoomIdState } from '@/context/recoil-context'
import { DeleteSummaryNote } from '@/lib/action'
import { useRouter } from 'next/navigation'

interface SummaryDeleteModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function SummaryDeleteModal({ isOpen, onClose }: SummaryDeleteModalProps) {
    const accessToken = useRecoilValue(accessTokenState);
    const selectedSummaryRoomId = useRecoilValue(selectedSummaryRoomIdState);
    const resetSelectedSummaryRoomId = useResetRecoilState(selectedSummaryRoomIdState); // 상태 초기화를 위한 훅
    const router = useRouter();

    if (!isOpen) return null

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            onClose()
        }
    }

    const handleYes = async () => {
        if (selectedSummaryRoomId) {
            if (!accessToken) return;
            console.log('selectedSummaryRoomId:', selectedSummaryRoomId);
            await DeleteSummaryNote(accessToken, selectedSummaryRoomId.toString());
            resetSelectedSummaryRoomId(); // selectedSummaryRoomId 초기화
            router.push('/project/idea'); // '/project/idea'로 이동
        }
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
                className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg max-w-[400px] w-full mx-2"
            >
                <h1 className="text-xl font-semibold text-gray-800 mb-8">정말 삭제하시겠습니까?</h1>
                <div className="flex w-full justify-center gap-[1.5rem]">
                    <button
                        onClick={() => {
                            onClose();
                        }}
                        className="flex-1 h-12 mx-2 justify-center items-center rounded-lg bg-[#E2E8F0] text-[#1E2A3B] font-semibold hover:bg-[#9DA1AD] transition-colors"
                    >
                        아니오
                    </button>
                    <button
                        onClick={() => {
                            handleYes();
                        }}
                        className="flex-1 h-12 mx-2 justify-center items-center rounded-lg bg-[#776BFF] text-white font-semibold hover:bg-[#AEA0FF] transition-colors"
                    >
                        예
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
