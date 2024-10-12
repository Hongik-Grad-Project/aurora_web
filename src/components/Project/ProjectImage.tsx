'use client'

import { useState, useRef } from "react"

export default function ProjectImage({ onFileChange }: { onFileChange: (file: File) => void }) {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onFileChange(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center justify-center w-[18.7rem] h-[200px] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 mb-[1rem] hover:bg-gray-200 transition-colors duration-300">
            {preview ? (
                <img src={preview} alt="Preview" className="object-cover h-full w-full rounded-lg" />
            ) : (
                <div className="flex flex-col items-center">
                    <p className="text-gray-600 mb-2">이미지 업로드</p>
                    <button 
                        type="button" // 버튼 타입을 명시적으로 button으로 설정
                        onClick={handleButtonClick} 
                        className="px-4 py-2 bg-[#776BFF] text-white rounded-md hover:bg-[#AEA0FF] transition-colors duration-300"
                    >
                        이미지 선택
                    </button>
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
            />
        </div>
    );
}
