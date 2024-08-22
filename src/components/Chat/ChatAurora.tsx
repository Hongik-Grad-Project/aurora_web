'use client'

import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { GetChatLocation } from '@/lib/action'

import ChatInput from './ChatInput'

export default function ChatAurora() {
    const accessToken = useRecoilValue(accessTokenState) || ''
    const [chatLocation, setChatLocation] = useState<string | null>(null)

    useEffect(() => {
        const getChatLocation = async () => {
            try {
                const location = await GetChatLocation(accessToken)
                setChatLocation(location)
            } catch (error) {
                console.error('채팅방 생성에 실패했습니다.', error)
            }
        }
        getChatLocation()
    }, [accessToken])

    return (
        <div className="flex mt-[2.38rem] mb-[2.94rem] w-[58rem] h-[36.5625rem] p-[3.125rem] flex-col items-start gap-[3.125rem] rounded-[1rem] bg-white relative">
            <ChatInput />
            {chatLocation && (
                <div className="text-sm text-gray-600">
                    Chat location: {chatLocation}
                </div>
            )}
        </div>
    )
}
