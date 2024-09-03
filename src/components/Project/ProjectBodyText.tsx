'use client'

import { useState } from 'react';

interface ProjectBodyTextProps {
    index: number;
    onChange: (index: number, subtitle: string, content: string) => void;
}

export default function ProjectBodyText({ index, onChange }: ProjectBodyTextProps) {
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');

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
        <div className="flex flex-col w-[58.75rem] items-start gap-[1.1875rem]">
            <div className="flex flex-col items-start gap-[1rem] self-stretch">
                <div className="flex flex-col items-end gap-[0.5rem] self-stretch">
                    <div className="flex flex-col justify-center items-start gap-[1.875rem] p-[1.25rem_1.75rem] self-stretch rounded-[0.4375rem] border border-[#AEA0FF] bg-[#FEFEFE]">
                        <div className="flex flex-col items-start gap-[0.625rem] self-stretch">
                            <label className="self-stretch text-[#9DA1AD] font-pretendard text-[1.5rem] font-semibold leading-[2.25rem]">
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
                            <p className="text-[#9DA1AD] font-pretendard text-[0.75rem] font-normal leading-[1.125rem]">
                                {subtitle.length}/60
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-[1.875rem] self-stretch">
                            <label className="self-stretch text-[#9DA1AD] font-medium text-[1rem] leading-[1.5rem]">
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
                            <p className="self-stretch text-[#9DA1AD] font-normal text-[0.75rem] leading-[1.125rem]">
                                {content.length}/1000
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
