'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { accessTokenState, selectedChatRoomIdState } from '@/context/recoil-context'
import { CreateSummaryNote } from '@/lib/action'
import LoadingSkeleton from '@/components/common/component/Skeleton/LoadingSkeleton'
import { useRouter } from 'next/navigation'

interface ChatModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState);
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
                const response = await CreateSummaryNote(accessToken, selectedChatRoomId.toString());
                
                // 성공적으로 응답을 받으면 noteId를 활용해서 경로로 이동
                if (response?.noteId) {
                    router.push(`/project/idea/${response.noteId}`);
                } else {
                    console.error('Invalid response: noteId is missing');
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
            try {
                
            } catch (error) {
                console.error('Failed to delete chat room:', error);
            } finally {
                setLoading(false); // 로딩 종료
                onClose();
            }
        }
    }

    if (loading) {
        return <LoadingSkeleton text="아이디어 노트가 자동 완성 중입니다"/>; // 로딩 중일 때 로딩 컴포넌트 표시
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
                <h1 className="text-base sm:text-xl font-semibold text-gray-800 mb-6 sm:mb-8">대화 내용을 요약하시겠습니까?</h1>
                <div className="flex w-full justify-center gap-4 sm:gap-[1.5rem]">
                    <button
                        onClick={handleNo}
                        className="flex-1 h-9 sm:h-12 justify-center items-center rounded-lg bg-gray-300 text-xs sm:text-base text-gray-800 font-semibold hover:bg-gray-400 transition-colors"
                    >
                        아니오
                    </button>
                    <button
                        onClick={handleYes}
                        className="flex-1 h-9 sm:h-12 justify-center items-center rounded-lg bg-[#776BFF] text-xs sm:text-base text-white font-semibold hover:bg-[#AEA0FF] transition-colors"
                    >
                        예
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
