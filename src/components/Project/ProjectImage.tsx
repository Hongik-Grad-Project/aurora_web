'use client'

import { useState, useRef } from "react"
import Image from 'next/image';

export default function ProjectImage({
    onFileChange,
    onRemove,
    preview
}: {
    onFileChange: (file: File) => void;
    onRemove: () => void;
    preview: string | null;
}) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileChange(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-[18.7rem] h-[200px] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 mb-[1rem] hover:bg-gray-200 transition-colors duration-300">
            {preview ? (
                <Image 
                    src={preview} 
                    alt="Preview" 
                    fill
                    className="object-cover rounded-lg"
                />
            ) : (
                <div className="flex flex-col items-center">
                    <p className="text-gray-600 mb-2">이미지 업로드</p>
                    <button
                        type="button"
                        onClick={handleButtonClick}
                        className="px-4 py-2 bg-[#776BFF] text-white rounded-md hover:bg-[#AEA0FF] transition-colors duration-300"
                    >
                        이미지 선택
                    </button>
                </div>
            )}
            <button
                type="button"
                className="absolute top-2 right-2 p-1 bg-[#776BFF] text-white font-bold rounded-full hover:bg-[#AEA0FF] focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center"
                onClick={onRemove}
                title="Remove image"
                style={{ width: '28px', height: '28px', fontSize: '16px', fontWeight: '300' }}
            >
                &times;
            </button>

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
