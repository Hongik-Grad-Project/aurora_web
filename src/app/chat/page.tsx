'use client';

import { useEffect, useState } from 'react';
import ChatAurora from '@/components/Chat/ChatAurora';
import ChatNav from '@/components/Chat/ChatNav';
import { GetChatList, GetChatHistory } from '@/lib/action';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '@/context/recoil-context';
import { ChatRoom, Message } from '@/lib/types';

export default function AuroraChatPage() {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const chatRoomsResponse = await GetChatList(accessToken);
                if (chatRoomsResponse.ok) {
                    const rooms = await chatRoomsResponse.json();
                    setChatRooms(rooms);
                } else {
                    throw new Error('Failed to fetch chat rooms.');
                }
            } catch (error) {
                console.error(error);
                setError('Failed to load chat rooms.');
            } finally {
                setLoading(false);
            }
        };

        if (accessToken) {
            fetchChatRooms();
        }
    }, [accessToken]);

    const handleSelectChatRoom = async (chatRoomId: number) => {
        const selectedRoom = chatRooms.find(room => room.chatRoomId === chatRoomId) || null;
        setSelectedChatRoom(selectedRoom);
        setChatHistory([]);

        if (selectedRoom) {
            try {
                const chatHistoryResponse = await GetChatHistory(accessToken, chatRoomId.toString());
                if (chatHistoryResponse.ok) {
                    const history = await chatHistoryResponse.json();
                    setChatHistory(history);
                } else {
                    throw new Error('Failed to fetch chat history.');
                }
            } catch (error) {
                console.error(error);
                setError('Failed to load chat history.');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex w-full h-screen">
            <div className="fixed left-0 top-0 h-full w-64 pt-[70px] border-r border-gray-300">
                <ChatNav chatRooms={chatRooms} onSelectChatRoom={handleSelectChatRoom} />
            </div>
            <div className="flex-grow ml-64 flex flex-col">
                <ChatAurora
                    chatRoom={selectedChatRoom}
                    chatHistory={chatHistory}
                    setChatHistory={setChatHistory}
                    accessToken={accessToken}
                />
            </div>
        </div>
    );
}
