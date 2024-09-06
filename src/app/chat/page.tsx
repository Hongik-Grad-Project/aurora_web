'use client';

import { useEffect, useState } from 'react';
import ChatAurora from '@/components/Chat/ChatAurora';
import ChatInput from '@/components/Chat/ChatInput';
import { GetChatList, GetChatHistory, GetChatLocation, SendMessage } from '@/lib/action';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '@/context/recoil-context';
import { ChatRoom, Message } from '@/lib/types';

export default function AuroraChatPage() {
    // Recoil 상태에서 accessToken을 가져옴
    const accessToken = useRecoilValue(accessTokenState) || '';
    
    // 채팅방 목록과 선택된 채팅방, 채팅 기록을 상태로 관리
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 컴포넌트가 마운트될 때 채팅방 목록을 가져오는 useEffect
    useEffect(() => {
        const fetchChatRooms = async () => {
            if (!accessToken) {
                setError('Access token is required.');
                return;
            }
            try {
                // 채팅방 목록을 API로부터 가져옴
                const chatRoomsResponse = await GetChatList(accessToken);
                setChatRooms(chatRoomsResponse);
            } catch (error) {
                console.error('Failed to load chat rooms:', error);
                setError('Failed to load chat rooms.');
            } finally {
                setLoading(false);
            }
        };

        if (accessToken) {
            fetchChatRooms();
        }
    }, [accessToken]);

    // 채팅방 선택 시 호출되는 함수
    const handleSelectChatRoom = async (chatRoomId: number, initialMessage?: string) => {
        const selectedRoom = chatRooms.find(room => room.chatRoomId === chatRoomId) || null;
        setSelectedChatRoom(selectedRoom);
        setChatHistory([]);

        if (selectedRoom) {
            try {
                // 선택된 채팅방의 채팅 기록을 API로부터 가져옴
                const chatHistoryResponse = await GetChatHistory(accessToken, chatRoomId.toString());
                if (chatHistoryResponse.ok) {
                    const history = await chatHistoryResponse.json();
                    setChatHistory(history);
                    // 초기 메시지가 있을 경우 전송
                    if (initialMessage) {
                        await handleSendMessage(chatRoomId, initialMessage);
                    }
                } else {
                    throw new Error('Failed to fetch chat history.');
                }
            } catch (error) {
                console.error('Failed to load chat history:', error);
                setError('Failed to load chat history.');
            }
        }
    };

    // 메시지를 전송하는 함수
    const handleSendMessage = async (chatRoomId: number, message: string) => {
        try {
            const sendMessageResponse = await SendMessage(accessToken, chatRoomId.toString(), message);
            if (sendMessageResponse.ok) {
                const messageResponse = await sendMessageResponse.json();
                setChatHistory(prev => [...prev, messageResponse]);
            } else {
                throw new Error('Failed to send message.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // 새 채팅방을 생성하고 초기 메시지를 전송하는 함수
    const handleCreateNewChatRoom = async (message: string) => {
        try {
            const location = await GetChatLocation(accessToken);
            if (location) {
                const newChatRoomId = parseInt(location.split('/').pop()!);
                const newChatRoom = {
                    chatRoomId: newChatRoomId,
                    chatRoomName: message, // 사용자가 입력한 메시지를 채팅방 이름으로 사용
                    isSummarized: false,
                    updatedAt: new Date().toISOString(),
                };
                setChatRooms(prevRooms => [...prevRooms, newChatRoom]);
                handleSelectChatRoom(newChatRoomId, message); // 새 채팅방을 선택하고 초기 메시지 전송
            }
        } catch (error) {
            console.error('Error creating new chat room:', error);
        }
    };

    // 로딩 상태와 에러 상태에 따른 UI 표시
    if (loading) {
        return <div className="flex items-center justify-center w-full h-screen"><p>Loading...</p></div>;
    }

    if (error) {
        return <div className="flex items-center justify-center w-full h-screen"><p className="text-red-500">{error}</p></div>;
    }

    return (
        <div>
            
        </div>
        // <div className="flex w-full h-screen">
        //     {/* 채팅방 목록과 채팅방 생성 버튼을 포함하는 사이드바 */}
        //     <div className="fixed left-0 top-0 h-full w-64 pt-[70px] border-r border-gray-300">
        //         <ChatNav chatRooms={chatRooms} onSelectChatRoom={handleSelectChatRoom} onCreateNewChatRoom={handleCreateNewChatRoom} />
        //     </div>
        //     {/* 채팅 기록과 선택된 채팅방의 내용을 표시하는 영역 */}
        //     <div className="flex-grow ml-64 flex flex-col">
        //         <ChatAurora
        //             chatRoom={selectedChatRoom}
        //             chatHistory={chatHistory}
        //             setChatHistory={setChatHistory}
        //             accessToken={accessToken}
        //         />
        //     </div>
        //     {/* 채팅 입력 영역 */}
        //     <ChatInput
        //         chatRoomId={selectedChatRoom ? selectedChatRoom.chatRoomId : null}
        //         setChatRoomId={setSelectedChatRoom}
        //         chatHistory={chatHistory}
        //         setChatHistory={setChatHistory}
        //         accessToken={accessToken}
        //         onCreateNewChatRoom={handleCreateNewChatRoom}
        //     />
        // </div>
    );
}
