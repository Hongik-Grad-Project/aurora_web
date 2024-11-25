'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, filteredProjectGalleryState } from '@/context/recoil-context'
import GalleryWindow from '@/components/Gallery/GalleryWindow'
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useRecoilState(filteredProjectGalleryState);
    const accessToken = useRecoilValue(accessTokenState);
    const router = useRouter();

    // 컴포넌트 마운트 시 검색 결과 초기화
    useEffect(() => {
        setSearchResults([]);
        setSearchInput('');
    }, [setSearchResults]);

    const handleSearch = async () => {
        if (!searchInput.trim()) return;

        try {
            const queryParams = new URLSearchParams({
                page: '1',
                size: '8',
                sortType: 'new',
                keyword: searchInput.trim()
            });

            const response = await GetProjectSearchFiltering(
                accessToken, 
                `/gallery/search/keyword?${queryParams.toString()}`
            );
            setSearchResults(response.content);
        } catch (error) {
            console.error('Failed to fetch filtered projects:', error);
        }
    };

    return (
        <>
            <div className="flex w-full max-w-[69.40625rem] mx-auto flex-col items-start gap-[1rem] pt-[2.91rem]">
                <div className="flex w-full flex-col justify-center items-center mb-[1.38rem]">
                    <h1 className="text-center text-[2.5rem] font-semibold mt-[5.19rem] mb-[5.06rem]">
                        어떤 방식의<br />프로젝트를 찾고 있나요?
                    </h1>
                    <div className="flex w-full items-center">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="검색어를 입력하세요"
                            className="flex w-full h-[3rem] text-[#776BFF] text-[2rem] font-semibold focus:outline-none placeholder-opacity-100 placeholder-[#6A6F7A] mb-[0.94rem]"
                        />
                        <button 
                            className="flex items-center justify-center h-[3rem] w-[3rem] bg-transparent border-none cursor-pointer"
                            onClick={handleSearch}
                        >
                            <Image 
                                src="/assets/icons/search_icon.svg" 
                                alt="검색" 
                                width={34} 
                                height={34} 
                                className={`opacity-30 ${searchInput.trim() ? 'hover:opacity-60' : ''}`}
                            />
                        </button>
                    </div>
                    <svg width="100%" height="0.1875rem">
                        <line x1="0" y1="0" x2="100%" y2="0" stroke="#E2E6EF" strokeWidth="3" />
                    </svg>
                </div>
            </div>

            {/* 검색 결과 */}
            {searchResults.length > 0 && (
                <div className="w-full max-w-[69.40625rem] mx-auto mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
                        {searchResults.map((project) => (
                            <div 
                                key={project.projectId} 
                                className="cursor-pointer transition-transform hover:scale-105"
                                onClick={() => router.push(`/project/${project.projectId}`)}
                            >
                                <GalleryWindow project={project} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export async function GetProjectSearchFiltering(accessToken: string | null, url: string) {
    const headers: HeadersInit = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
    const options: RequestInit = {
        method: 'GET',
        headers,
        credentials: accessToken ? 'include' : 'omit', // 토큰이 없으면 쿠키 전송을 생략
      };
    const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}${url}`, options)

    if (!response.ok) {
        throw new Error('Failed to fetch filtered project gallery')
    }

    return await response.json()
}
