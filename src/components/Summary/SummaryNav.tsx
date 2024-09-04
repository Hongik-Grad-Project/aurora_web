'use client'

export default function SummaryNav() {
    return (
        <div className="flex flex-col w-[16.25rem] h-full bg-[#FFFFFF] p-4 border-r border-gray-200 overflow-y-auto">
            {/* 채팅 헤더 */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">요약된 채팅</h2>
            </div>
            {/* Chat List */}
            <div className="flex flex-col space-y-2">
                <div className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <p className="text-sm font-medium text-gray-700">Chat with TaeHyung</p>
                    <p className="text-xs text-gray-500">Last message preview...</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <p className="text-sm font-medium text-gray-700">Chat with Yoona</p>
                    <p className="text-xs text-gray-500">Last message preview...</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <p className="text-sm font-medium text-gray-700">Chat with Gemini</p>
                    <p className="text-xs text-gray-500">Last message preview...</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <p className="text-sm font-medium text-gray-700">Chat with Dongmin</p>
                    <p className="text-xs text-gray-500">Last message preview...</p>
                </div>
            </div>
        </div>
    )
}
