'use client';

import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { accessTokenState, chatRoomsState, selectedChatRoomIdState, authState } from '@/context/recoil-context';
import { ChatRoom } from '@/lib/types';
import { GetChatList } from '@/lib/action';

export default function ChatNav() {
  const accessToken = useRecoilValue(accessTokenState) || '';
  const isAuth = useRecoilValue(authState); // Assumed you use this to verify authentication
  const setSelectedChatRoomId = useSetRecoilState(selectedChatRoomIdState); // Use Recoil for selected chat room
  const [chatRooms, setChatRooms] = useRecoilState<ChatRoom[]>(chatRoomsState); // Use Recoil for chat rooms
  const [loading, setLoading] = useState(true); // Local state for loading
  const [error, setError] = useState<string | null>(null); // Local state for errors

  // Fetch chat rooms when the component mounts or when the accessToken changes
  useEffect(() => {
    const fetchChatRooms = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching

      try {
        const chatRoomsResponse = await GetChatList(accessToken);
        setChatRooms(chatRoomsResponse);
      } catch (err) {
        console.error('Error fetching chat rooms:', err);
        setError('Failed to load chat rooms.');
      } finally {
        setLoading(false); // Stop loading once request finishes
      }
    };

    if (isAuth && accessToken) {
      fetchChatRooms();
    }
  }, [accessToken, isAuth, setChatRooms]);

  // Handler for selecting a chat room
  const onSelectChatRoom = (chatRoomId: number) => {
    setSelectedChatRoomId(chatRoomId); // Set the selected chat room in the global state
  };

  // Placeholder for creating a new chat room
  const onCreateNewChatRoom = () => {
    setSelectedChatRoomId(null); // Clear the selected chat room
    console.log('Preparing for a new chat room');
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 p-4 bg-white h-full w-full border-r border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">채팅 내역</h2>
          <button
            onClick={onCreateNewChatRoom}
            title="새 채팅방 추가"
            className="bg-blue-500 text-white p-2 rounded"
          >
            <FontAwesomeIcon icon={faPlus} />
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
          <button
            onClick={onCreateNewChatRoom}
            title="새 채팅방 추가"
            className="bg-blue-500 text-white p-2 rounded"
          >
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
    <div className="flex flex-col gap-4 p-4 bg-white h-full w-full border-r border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">채팅 내역</h2>
        <button
          onClick={onCreateNewChatRoom}
          title="새 채팅방 추가"
          className="bg-blue-500 text-white p-2 rounded"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      {chatRooms.length === 0 ? (
        <div className="text-gray-500">채팅 내역이 없습니다.</div>
      ) : (
        <div className="space-y-3 overflow-y-auto">
          {chatRooms.map((room) => (
            <div
              key={room.chatRoomId}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out"
              onClick={() => onSelectChatRoom(room.chatRoomId)}
            >
              <div className="flex items-center space-x-3">
                <div className="text-md font-medium text-gray-800">
                  {room.chatRoomName}
                </div>
                {room.isSummarized && (
                  <span className="text-xs font-semibold text-blue-500 bg-blue-100 px-2 py-1 rounded">
                    Summarized
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(room.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
