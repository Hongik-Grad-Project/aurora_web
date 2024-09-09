'use client';

import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenState, authState, selectedChatRoomIdState, selectedChatHistoryState } from '@/context/recoil-context';
import { GetChatLocation, SendMessage } from '@/lib/action';
import { Message as AuroraMessage } from '@/lib/types';

// ChatInput 컴포넌트는 사용자가 메시지를 입력하고 전송하는 기능을 담당합니다.
export default function ChatInput() {
    // Recoil 상태 관리 훅을 사용하여 필요한 상태 값을 가져오고 설정합니다.
    const accessToken = useRecoilValue(accessTokenState) || '';
    const isAuth = useRecoilValue(authState);
    const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState);
    const setSelectedChatRoomId = useSetRecoilState(selectedChatRoomIdState);
    const setChatHistory = useSetRecoilState(selectedChatHistoryState);

    // 입력 값과 textarea의 크기 조절을 위한 상태 관리
    const [inputValue, setInputValue] = useState<string>('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const isSendingRef = useRef<boolean>(false); // 중복 전송을 방지하기 위한 플래그

    // 입력값 변경에 따라 textarea의 크기를 동적으로 조절합니다.
    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        autoResizeTextarea();
        
        const userMessage: AuroraMessage = {
            contents: inputValue,
            senderType: 'MEMBER',
            createdAt: new Date().toISOString(),
        };
        setChatHistory(prev => [...prev, userMessage]);
    };

    // textarea의 높이를 내용에 맞게 조절하는 함수
    const autoResizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    // 메시지 전송 및 채팅방 생성을 담당하는 함수
    const createChatRoomAndSendMessage = async () => {
        if (!isAuth) {
            alert('로그인 이후에 채팅을 이용할 수 있습니다.');
            return;
        }
        
        if (inputValue.trim() === '' || isSendingRef.current) return;
        
        isSendingRef.current = true;
        let currentChatRoomId = selectedChatRoomId;
        
        if (!currentChatRoomId) {
            const location = await GetChatLocation(accessToken);
            if (location) {
                currentChatRoomId = parseInt(location.split('/').pop()!);
                setSelectedChatRoomId(currentChatRoomId);
            }
        }
        
        if (currentChatRoomId) {
            const userMessage: AuroraMessage = {
                contents: inputValue,
                senderType: 'MEMBER',
                createdAt: new Date().toISOString(),
            };
            
            // 상태에 사용자 메시지를 즉시 추가
            setChatHistory(prev => [...prev, userMessage]);
            
            // 서버에 메시지 전송
            const response = await SendMessage(accessToken, currentChatRoomId.toString(), inputValue);
            if (response.ok) {
                const data = await response.json();
                const aiMessage: AuroraMessage = {
                    contents: data.responseMessage,
                    senderType: 'AURORA_AI',
                    createdAt: new Date().toISOString(),
                };
                // AI 응답을 채팅 내역에 추가
                setChatHistory(prev => [...prev, aiMessage]);
            } else {
                console.error('Failed to send message:', response.statusText);
            }
        }
        
        setInputValue('');
        isSendingRef.current = false;
    };
        
    
    // Enter 키 이벤트를 처리하여 메시지를 전송합니다.
    const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            await createChatRoomAndSendMessage();
        }
    };

    // 입력 영역을 렌더링합니다.
    return (
        <div className="bg-white p-4 border-t border-gray-200">
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
