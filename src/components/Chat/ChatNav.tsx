'use client';

import { ChatRoom } from "@/lib/types";

interface ChatNavProps {
  chatRooms: ChatRoom[];
  onSelectChatRoom: (chatRoomId: number) => void;
}

export default function ChatNav({ chatRooms, onSelectChatRoom }: ChatNavProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white h-full w-full border-r border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">채팅 내역</h2>
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
