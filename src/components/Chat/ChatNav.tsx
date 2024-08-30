'use client'

export default function ChatNav() {
    return (
        <div className="flex flex-col w-[16.25rem] h-full bg-[#FEFEFE] p-4 border-r border-gray-200 overflow-y-auto">
            {/* Chat Header */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Conversations</h2>
            </div>
            {/* Chat List */}
            <div className="flex flex-col space-y-2">
                <div className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <p className="text-sm font-medium text-gray-700">Chat with Alice</p>
                    <p className="text-xs text-gray-500">Last message preview...</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <p className="text-sm font-medium text-gray-700">Chat with Bob</p>
                    <p className="text-xs text-gray-500">Last message preview...</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <p className="text-sm font-medium text-gray-700">Chat with Carol</p>
                    <p className="text-xs text-gray-500">Last message preview...</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <p className="text-sm font-medium text-gray-700">Chat with Dave</p>
                    <p className="text-xs text-gray-500">Last message preview...</p>
                </div>
                {/* Add more chat items as needed */}
            </div>
        </div>
    )
}
