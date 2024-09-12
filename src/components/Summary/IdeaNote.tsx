'use client'

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRecoilValue, useRecoilState } from 'recoil';
import { accessTokenState, authState, summaryRoomsState, selectedSummaryContentState, selectedSummaryRoomIdState } from '@/context/recoil-context';


export default function IdeaNote() {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const isAuth = useRecoilValue(authState); // 로그인 여부 확인
    const selectedSummaryRoomId = useRecoilValue(selectedSummaryRoomIdState); // 현재 선택된 채팅방 ID
    const summaryContent = useRecoilValue(selectedSummaryContentState); // 현재 채팅 내역
    const summaryRooms = useRecoilValue(summaryRoomsState); // 채팅방 목록
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const currentSummaryRoom = summaryRooms.find((sumRoom) => sumRoom.noteId === selectedSummaryRoomId);

    return (
        <>
            <div className="flex flex-col w-full h-full bg-gray-100 relative">
                <div className="flex-grow overflow-y-auto p-6 bg-white">

                </div>
            </div>
        </>
    )
}