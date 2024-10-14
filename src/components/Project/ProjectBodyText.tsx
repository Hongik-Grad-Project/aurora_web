'use client';

import { useState, useEffect } from 'react';

interface ProjectBodyTextProps {
    index: number;
    subtitle?: string;
    content?: string;
    onChange: (index: number, subtitle: string, content: string) => void;
    onRemove: (index: number) => void; // onRemove 함수 props로 추가
}

export default function ProjectBodyText({ index, subtitle: initialSubtitle = '', content: initialContent = '', onChange, onRemove }: ProjectBodyTextProps) {
    const [subtitle, setSubtitle] = useState(initialSubtitle);
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        setSubtitle(initialSubtitle);
        setContent(initialContent);
    }, [initialSubtitle, initialContent]);

    const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSubtitle = e.target.value;
        setSubtitle(newSubtitle);
        onChange(index, newSubtitle, content);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setContent(newContent);
        onChange(index, subtitle, newContent);
    };

    return (
        <div className="flex flex-col w-full items-start gap-[1.1875rem] relative">
            <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-0 right-0 flex justify-center items-center p-1 w-6 h-6 bg-purple-500 text-white rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                title="Remove section"
            >
                &times;
            </button>
            <div className="flex flex-col items-start gap-[1rem] w-full">
                <label className="text-[#9DA1AD] font-pretendard text-[1.5rem] font-semibold leading-[2.25rem]">
                    소제목: 첫 문장이 가장 중요! 계속 읽고 싶게 쓰기
                </label>
                <input
                    type="text"
                    value={subtitle}
                    onChange={handleSubtitleChange}
                    maxLength={60}
                    className="w-full p-2 border rounded"
                    placeholder="소제목을 입력하세요 (최대 60자)"
                />
                <p className="text-[#9DA1AD] text-[0.75rem] leading-[1.125rem]">
                    {subtitle.length}/60
                </p>
                <label className="text-[#9DA1AD] font-medium text-[1rem] leading-[1.5rem]">
                    본문: 이 내용을 모르는 사람도 공감할 수 있게
                </label>
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    maxLength={1000}
                    className="w-full p-2 border rounded"
                    rows={4}
                    placeholder="본문을 입력하세요 (최대 1000자)"
                />
                <p className="text-[#9DA1AD] text-[0.75rem] leading-[1.125rem]">
                    {content.length}/1000
                </p>
            </div>
        </div>
    );
}
