'use client'
import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, authState, filteredProjectGalleryState } from '@/context/recoil-context'

import LableBtn from "./Lable"
import { TargetObject } from '@/lib/data'

interface GalleryCategoryNavProps {
    currentPage: number;
    pageSize: number;
    sortType: string;
    setCurrentPage: (page: number) => void;
    setSortType: (sortType: string) => void;
}

export default function GalleryCategoryNav({ currentPage, pageSize, sortType, setCurrentPage, setSortType }: GalleryCategoryNavProps) {
    const accessToken = useRecoilValue(accessTokenState) || ''
    const isAuth = useRecoilValue(authState)
    const [filteredProjectGallery, setFilteredProjectGallery] = useRecoilState(filteredProjectGalleryState)

    // 필터 상태 관리
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
        targets: [] // 필터 선택 (예: 실버세대, 청소년 등)
    })

    // 필터링된 프로젝트 갤러리 데이터 가져오기
    const fetchFilteredProjectGallery = async () => {
        const queryParams = new URLSearchParams()

        // 필터 선택 항목을 쿼리 파라미터에 추가
        Object.entries(selectedFilters).forEach(([key, values]) => {
            values.forEach((value) => {
                queryParams.append(key, value)
            })
        })

        // 페이지, 사이즈, 정렬 정보 추가
        queryParams.append('page', currentPage.toString())
        queryParams.append('size', pageSize.toString())
        queryParams.append('sortType', sortType)

        const query = queryParams.toString()
        const url = `/gallery?${query}`

        try {
            const response = await GetProjectGalleryFiltering(accessToken, url)
            setFilteredProjectGallery(response.content) // API 응답 데이터 설정
        } catch (error) {
            console.error('Error fetching project gallery:', error)
        }
    }

    // 필터, 페이지, 정렬 변경될 때마다 데이터 가져오기
    useEffect(() => {
        fetchFilteredProjectGallery()
    }, [selectedFilters, currentPage, pageSize, sortType])

    return (
        <div className="flex flex-col items-start gap-[0.5rem] self-stretch">
            {/* 필터 버튼 */}
            <div className="flex flex-wrap items-center gap-[0.5rem] self-stretch">
                {TargetObject.map((target) => (
                    <LableBtn
                        key={target}
                        text={target}
                    />
                ))}
            </div>
        </div>
    )

    // 필터 선택 처리
    function handleFilterSelect(key: string, value: string) {
        setSelectedFilters((prevFilters) => {
            const newFilters = { ...prevFilters }
            if (newFilters[key]?.includes(value)) {
                // 필터에서 제거
                newFilters[key] = newFilters[key].filter((item) => item !== value)
            } else {
                // 필터 추가
                newFilters[key] = [...(newFilters[key] || []), value]
            }
            return newFilters
        })
    }
}

export async function GetProjectGalleryFiltering(accessToken: string, url: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error('Failed to fetch filtered project gallery')
    }

    return await response.json()
}
