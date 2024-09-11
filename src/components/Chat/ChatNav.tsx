'use client';

import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { accessTokenState, chatRoomsState, selectedChatRoomIdState, selectedChatHistoryState, authState } from '@/context/recoil-context';
import { ChatRoom } from '@/lib/types';
import { GetChatList, GetChatHistory } from '@/lib/action';

export default function ChatNav() {
  const accessToken = useRecoilValue(accessTokenState) || '';
  const isAuth = useRecoilValue(authState); // Assumed you use this to verify authentication
  const [selectedChatRoomId, setSelectedChatRoomId] = useRecoilState(selectedChatRoomIdState); // Use Recoil for selected chat room

  const setChatHistory = useSetRecoilState(selectedChatHistoryState); // 채팅 내역 업데이트를 위한 setter
  const [chatRooms, setChatRooms] = useRecoilState<ChatRoom[]>(chatRoomsState); // Use Recoil for chat rooms
  const [loading, setLoading] = useState(true); // Local state for loading
  const [error, setError] = useState<string | null>(null); // Local state for errors


  // Fetch chat rooms when the component mounts or when the accessToken changes
  useEffect(() => {
    console.log('ChatNav의 useEffect 실행');
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

  useEffect(() => {
    const fetchChatHistory = async () => {
      console.log('fetchChatHistory 실행');
      if (selectedChatRoomId !== null) {
        try {
          const response = await GetChatHistory(accessToken, selectedChatRoomId.toString());
          if (response.ok) {
            const historyData = await response.json();
            console.log('Chat history fetched:', historyData);
            setChatHistory(historyData);
          } else {
            console.error("Failed to fetch chat history:", response.statusText);
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

  // ChatNav에서 채팅방 선택
  const onSelectChatRoom = (chatRoomId: number) => {
    console.log('Chat room selected:', chatRoomId);
    setSelectedChatRoomId(chatRoomId); // 선택된 채팅방 ID를 설정하여 ChatAurora가 반응하도록 함
  };

  // 선택한 채팅방이 없는 상태로 돌림
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
            className="p-2 rounded bg-transparent" // 배경을 투명하게 설정
          >
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
          className="p-2 rounded bg-transparent"
        >
          <FontAwesomeIcon icon={faPlus} className="text-black" />
        </button>

      </div>

      {chatRooms.length === 0 ? (
        <div className="text-gray-500">채팅 내역이 없습니다.</div>
      ) : (
        <div className="space-y-3 overflow-y-auto">
          {chatRooms.map((room) => (
            <div
              key={room.chatRoomId} // 고유한 key 값을 지정
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
