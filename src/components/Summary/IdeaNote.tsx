'use client'

export default function IdeaNote() {
    
    return (
        <div className="flex flex-col w-full h-full bg-gray-100 relative">
            <div className="flex-grow overflow-y-auto p-6 bg-white">
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <div className="text-center">선택한 요약 노트가 없습니다.</div>
                </div>
            </div>
        </div>
    );
}
