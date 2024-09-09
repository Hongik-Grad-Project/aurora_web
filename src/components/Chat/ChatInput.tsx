'use client';

import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenState, authState, selectedChatRoomIdState, selectedChatHistoryState } from '@/context/recoil-context';
import { GetChatLocation, SendMessage } from '@/lib/action';
import { Message as AuroraMessage } from '@/lib/types';

export default function ChatInput() {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const isAuth = useRecoilValue(authState); // 인증 여부 확인
    const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState); // 현재 선택된 채팅방 ID 가져오기
    const setSelectedChatRoomId = useSetRecoilState(selectedChatRoomIdState); // 새로운 채팅방 생성 시 설정
    const setChatHistory = useSetRecoilState(selectedChatHistoryState); // 채팅 내역 상태 업데이트

    const [inputValue, setInputValue] = useState<string>('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const isSendingRef = useRef<boolean>(false); // 중복 전송 방지 플래그

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        autoResizeTextarea();
    };

    const autoResizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const createChatRoomAndSendMessage = async () => {
        if (!isAuth) {
            alert('로그인 이후에 채팅을 이용할 수 있습니다.');
            return;
        }

        if (inputValue.trim() === '' || isSendingRef.current) return; // 빈 메시지나 중복 전송 방지

        isSendingRef.current = true;
        let currentChatRoomId = selectedChatRoomId;

        // 새로운 채팅방 생성이 필요한 경우
        if (!currentChatRoomId) {
            const location = await GetChatLocation(accessToken);
            if (location) {
                currentChatRoomId = parseInt(location.split('/').pop()!);
                setSelectedChatRoomId(currentChatRoomId); // 새로운 채팅방 ID 설정
            }
        }

        if (currentChatRoomId) {
            // 사용자 메시지 추가
            const userMessage: AuroraMessage = {
                contents: inputValue,
                senderType: 'MEMBER',
                createdAt: new Date().toISOString(),
            };
            setChatHistory(prev => [...prev, userMessage]); // 채팅 내역에 사용자 메시지 추가

            // AI 메시지 전송 및 응답 처리
            const response = await SendMessage(accessToken, currentChatRoomId.toString(), inputValue);
            if (response.ok) {
                const data = await response.json();
                const aiMessage: AuroraMessage = {
                    contents: data.responseMessage,
                    senderType: 'AURORA_AI',
                    createdAt: new Date().toISOString(),
                };
                setChatHistory(prev => [...prev, aiMessage]); // 채팅 내역에 AI 응답 추가
            } else {
                console.error('Failed to send message:', response.statusText);
            }
        }

        setInputValue(''); // 입력 필드 초기화
        isSendingRef.current = false; // 전송 플래그 초기화
    };

    const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            await createChatRoomAndSendMessage();
        }
    };

    return (
        <div className="bg-white p-4 border-t border-gray-200 fixed bottom-0 left-0 w-full">
            <div className="flex items-end gap-[0.75rem] w-full max-w-[48rem] mx-auto">
                <div className="flex-grow flex items-center px-[1.5rem] py-[0.25rem] rounded-[1rem] border border-[#AEA0FF] bg-white">
                    <textarea
                        ref={textareaRef}
                        className="w-full text-[#6A6F7A] font-medium text-[1rem] leading-[1.5rem] resize-none outline-none overflow-hidden"
                        placeholder="메시지를 입력하세요..."
                        value={inputValue}
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        style={{ minHeight: '1.5rem', maxHeight: '6rem', padding: '0.5rem 0' }}
                    />
                </div>
                <button
                    onClick={createChatRoomAndSendMessage}
                    className="flex h-[3.2rem] px-[1.5rem] py-[0.5rem] justify-center items-center gap-[0.625rem] rounded-[1rem] bg-[#007BFF] text-white font-semibold"
                >
                    전송
                </button>
            </div>
        </div>
    );
}
