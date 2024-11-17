'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accessTokenState, selectedChatRoomIdState } from '@/context/recoil-context'
import { DeleteChatRoom } from '@/lib/action'
import LoadingSkeleton from '@/components/common/component/Skeleton/LoadingSkeleton'
import { useRouter } from 'next/navigation'
interface ChatDeleteModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function ChatDeleteModal({ isOpen, onClose }: ChatDeleteModalProps) {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState);
    const setSelectedChatRoomId = useSetRecoilState(selectedChatRoomIdState);
    const [loading, setLoading] = useState<boolean>(false) // 로딩 상태 초기값은 false
    const router = useRouter();
    if (!isOpen) return null;

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    const handleYes = async () => {
        if (selectedChatRoomId) {
            setLoading(true); // 로딩 시작
            try {
                const response = await DeleteChatRoom(accessToken, selectedChatRoomId.toString());
                if (response === 204) {
                    setSelectedChatRoomId(null);
                    router.refresh();
                }
            } catch (error) {
                console.error('Failed to create summary:', error);
            } finally {
                setLoading(false); // 로딩 종료
                onClose();
            }
        }
    };
    
    const handleNo = async () => {
        if (selectedChatRoomId) {
            setLoading(true); // 로딩 시작
            onClose();
        }
    }

    if (loading) {
        return <LoadingSkeleton text="채팅방 삭제 중입니다"/>;
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
                <h1 className="text-xl font-semibold text-gray-800 mb-8">대화 내용을 삭제하시겠습니까?</h1>
                <div className="flex w-full justify-center gap-[1.5rem]">
                    <button
                        onClick={handleNo}
                        className="flex-1 h-12 mx-2 justify-center items-center rounded-lg bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition-colors"
                    >
                        아니오
                    </button>
                    <button
                        onClick={handleYes}
                        className="flex-1 h-12 mx-2 justify-center items-center rounded-lg bg-[#776BFF] text-white font-semibold hover:bg-[#AEA0FF] transition-colors"
                    >
                        예
                    </button>
                </div>
            </motion.div>
        </div>
    );
}