'use client'

import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { accessTokenState, selectedChatRoomIdState } from '@/context/recoil-context'
import { DeleteChatRoom, CreateSummaryNote } from '@/lib/action'

interface ChatModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState);

    if (!isOpen) return null

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            onClose()
        }
    }

    const handleYes = async () => {
        if (selectedChatRoomId) {
            const response = await CreateSummaryNote(accessToken, selectedChatRoomId.toString());
            if (response.ok) {
                console.log('요약 생성 성공');
            } else {
                console.error('요약 생성 실패');
            }
        }
        onClose();
    }

    const handleNo = async () => {
        if (selectedChatRoomId) {
            const response = await DeleteChatRoom(accessToken, selectedChatRoomId.toString());
            if (response.ok) {
                console.log('채팅방 삭제 성공');
            } else {
                console.error('채팅방 삭제 실패');
            }
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
                <h1 className="text-xl font-semibold text-gray-800 mb-8">대화 내용을 요약하시겠습니까?</h1>
                <div className="flex w-full justify-center gap-[1.5rem]">
                    <button
                        onClick={() => {
                            handleNo();
                            onClose();
                        }}
                        className="flex-1 h-12 mx-2 justify-center items-center rounded-lg bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition-colors"
                    >
                        아니오
                    </button>
                    <button
                        onClick={() => {
                            handleYes();
                        }}
                        className="flex-1 h-12 mx-2 justify-center items-center rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
                    >
                        예
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
