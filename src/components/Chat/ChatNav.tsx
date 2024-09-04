'use client';

import { ChatRoom } from "@/lib/types"; // ChatRoom 타입 가져오기

interface ChatNavProps {
  chatRooms: ChatRoom[];
  onSelectChatRoom: (chatRoomId: number) => void; // 채팅방 선택 시 호출할 콜백 함수
}

export default function ChatNav({ chatRooms, onSelectChatRoom }: ChatNavProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 h-full w-full">
      {chatRooms.map((room) => (
        <div
          key={room.chatRoomId}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
          onClick={() => onSelectChatRoom(room.chatRoomId)} // 채팅방 클릭 시 ID 전달
        >
          <div>{room.chatRoomName}</div>
          {room.isSummarized && <span className="text-sm text-blue-500">Summarized</span>}
          <div className="text-sm text-gray-500">{new Date(room.updatedAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
