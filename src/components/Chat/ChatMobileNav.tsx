'use client';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { accessTokenState, chatRoomsState, selectedChatRoomIdState, selectedChatHistoryState, authState } from '@/context/recoil-context';
import { ChatRoom } from '@/lib/types';
import { GetChatList, GetChatHistory } from '@/lib/action';

export default function ChatMobileNav() {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const isAuth = useRecoilValue(authState) || false
    const [selectedChatRoomId, setSelectedChatRoomId] = useRecoilState(selectedChatRoomIdState);
    const setChatHistory = useSetRecoilState(selectedChatHistoryState);
    const [chatRooms, setChatRooms] = useRecoilState<ChatRoom[]>(chatRoomsState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchChatRooms = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log('Auth status:', isAuth);
                console.log('Access token:', accessToken);
                
                const chatRoomsResponse = await GetChatList(accessToken);
                setChatRooms(chatRoomsResponse);
            } catch (err) {
                console.error('Error fetching chat rooms:', err);
                setError('Failed to load chat rooms.');
            } finally {
                setLoading(false);
            }
        };

        if (isAuth && accessToken) {
            fetchChatRooms();
        } else {
            setLoading(false);
        }
    }, [accessToken, isAuth, setChatRooms]);

    useEffect(() => {
        const fetchChatHistory = async () => {
            if (selectedChatRoomId !== null) {
                try {
                    const historyData = await GetChatHistory(accessToken, selectedChatRoomId.toString());
                    if (historyData) {
                        setChatHistory(historyData);
                    } else {
                        console.error("Failed to fetch chat history: No data received");
                    }
                } catch (error) {
                    console.error("Error fetching chat history:", error);
                }
            } else {
                setChatHistory([]);
            }
        };

        if (isAuth && accessToken) {
            fetchChatHistory();
        }
    }, [selectedChatRoomId, setChatHistory]);

    const onSelectChatRoom = (chatRoomId: number) => {
        setSelectedChatRoomId(chatRoomId);
    };

    const onCreateNewChatRoom = () => {
        setSelectedChatRoomId(null);
    };


    // Display either "채팅 내역" or the selected chat room name
    const headerTitle = selectedChatRoomId
        ? chatRooms.find(room => room.chatRoomId === selectedChatRoomId)?.chatRoomName || "채팅방 이름 없음"
        : "채팅 내역";

    if (loading) {
        return (
            <div className="flex flex-col gap-4 p-4 bg-white h-full w-full border-r border-gray-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">채팅 내역</h2>
                    <button onClick={onCreateNewChatRoom} title="새 채팅방 추가" className="p-2 rounded bg-transparent">
                        <FontAwesomeIcon icon={faPlus} className="text-black" />
                    </button>
                </div>
                <div className="space-y-3 overflow-y-auto">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
                        <p className="text-gray-500">로그인 이후 확인 가능해요</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col gap-4 p-4 bg-white h-full w-full border-r border-gray-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">채팅 내역</h2>
                    <button onClick={onCreateNewChatRoom} title="새 채팅방 추가" className="bg-blue-500 text-white p-2 rounded">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <div className="space-y-3 overflow-y-auto">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
                        <p className="text-red-500">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            <button className="p-4 bg-white text-gray-800 flex items-center justify-center w-full space-x-2" onClick={() => setIsOpen(!isOpen)}>
                <span>{selectedChatRoomId ? chatRooms.find(room => room.chatRoomId === selectedChatRoomId)?.chatRoomName || "채팅방 이름 없음" : "채팅 내역"}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white z-10 overflow-hidden transition-max-height duration-300 ease-in-out" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    <div className="space-y-1 p-2">
                        {chatRooms.map(room => (
                            <div
                                key={room.chatRoomId}
                                className={`flex items-center justify-between p-3 rounded-lg shadow-sm cursor-pointer transition duration-200 ease-in-out ${selectedChatRoomId === room.chatRoomId ? "bg-[#EFEDFF] hover:bg-[#CEC6FF]" : "bg-gray-50 hover:bg-gray-100"}`
                                }
                                onClick={() => onSelectChatRoom(room.chatRoomId)}
                            >
                                <div className="flex flex-col space-y-1">
                                    <div className="text-md font-medium text-gray-800">{room.chatRoomName || "채팅방 이름 없음"}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
