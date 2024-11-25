'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, filteredProjectGalleryState } from '@/context/recoil-context'
import GalleryWindow from '@/components/Gallery/GalleryWindow'
import { GetPopularGalleryTag } from '@/lib/action'
import { useRouter } from 'next/navigation';
import Label from '@/components/Gallery/Lable'

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useRecoilState(filteredProjectGalleryState);
    const [popularTags, setPopularTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const accessToken = useRecoilValue(accessTokenState);
    const router = useRouter();

    // 컴포넌트 마운트 시 검색 결과 초기화 및 인기 태그 가져오기
    useEffect(() => {
        setSearchResults([]);
        setSearchInput('');
        if (accessToken) {
            GetPopularGalleryTag(accessToken).then(response => {
                setPopularTags(response.tags);
            });
        }
    }, [setSearchResults, accessToken]);

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

    const handleTagClick = async (tagText: string, isActive: boolean) => {
        if (isActive) {
            // 태그 추가
            setSelectedTags(prev => [...prev, tagText]);
            // 검색창에 모든 선택된 태그를 | 로 구분해서 표시
            setSearchInput(prev => {
                const newTags = [...prev.split('|').map(t => t.trim()).filter(t => t), tagText];
                return newTags.join(' | ');
            });
        } else {
            // 태그 제거
            setSelectedTags(prev => prev.filter(tag => tag !== tagText));
            setSearchInput(prev => {
                const newTags = prev.split('|')
                    .map(t => t.trim())
                    .filter(t => t && t !== tagText);
                return newTags.length > 0 ? newTags.join(' | ') : '';
            });
        }

        // 검색 실행
        try {
            const queryParams = new URLSearchParams({
                page: '1',
                size: '8',
                sortType: 'new',
                keyword: tagText
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
            <div className="flex w-full max-w-[69.40625rem] mx-auto flex-col items-start gap-[1rem] pt-[2.91rem] px-4 sm:px-6">
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

                    {/* 인기 태그 섹션 */}
                    <div className="w-full mt-4 sm:mt-6">
                        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">인기 태그</p>
                        <div className="flex flex-wrap gap-2">
                            {popularTags.map((tag, index) => (
                                <Label
                                    key={index}
                                    text={tag}
                                    isActive={selectedTags.includes(tag)}
                                    onClick={(text, isActive) => handleTagClick(text, isActive)}
                                />
                            ))}
                        </div>
                    </div>
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
