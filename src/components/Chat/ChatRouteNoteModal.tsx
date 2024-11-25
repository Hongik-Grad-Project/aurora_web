'use client'

import { useState } from 'react';
import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next//navigation'
import { accessTokenState, selectedChatRoomIdState } from '@/context/recoil-context'

interface ChatModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function ChatRouteNoteModal({ isOpen, onClose }: ChatModalProps) {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState);
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            onClose()
        }
    }

    // 예 버튼을 눌렀을 때 note 데이터를 가져와 project 페이지로 이동
    const handleYes = async () => {
        setLoading(true);
        try {
            // GET 요청으로 noteId 정보 가져오기
            const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/chat/${selectedChatRoomId}/note`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch note data');
            }

            const noteData = await response.json();
            const noteId = noteData.noteId;

            // noteId를 기반으로 project/idea/{noteId} 경로로 이동
            router.push(`/project/idea/${noteId}`);
            onClose();
        } catch (err) {
            console.error('Failed to fetch note and redirect:', err);
            setError('노트 데이터를 가져오는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

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
                className="flex flex-col items-center justify-center bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-[320px] sm:max-w-[400px] w-[90%] mx-auto"
            >
                <h1 className="text-base sm:text-xl font-semibold text-gray-800 mb-6 sm:mb-8">요약된 아이디어 노트로 이동하시겠습니까?</h1>
                <div className="flex w-full justify-center gap-4 sm:gap-[1.5rem]">
                    <button
                        onClick={() => {
                            handleNo();
                        }}
                        className="flex-1 h-9 sm:h-12 justify-center items-center rounded-lg bg-gray-300 text-xs sm:text-base text-gray-800 font-semibold hover:bg-gray-400 transition-colors"
                    >
                        아니오
                    </button>
                    <button
                        onClick={() => {
                            handleYes();
                        }}
                        className="flex-1 h-9 sm:h-12 justify-center items-center rounded-lg bg-[#776BFF] text-xs sm:text-base text-white font-semibold hover:bg-[#AEA0FF] transition-colors"
                    >
                        예
                    </button>
                </div>
            </motion.div>
        </div>
    )
}