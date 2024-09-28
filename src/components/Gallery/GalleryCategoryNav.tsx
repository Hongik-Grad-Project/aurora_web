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

    // 필터 상태 관리 (필터의 타겟 리스트를 관리)
    const [selectedTargets, setSelectedTargets] = useState<string[]>([])

    // 필터링된 프로젝트 갤러리 데이터 가져오기
    const fetchFilteredProjectGallery = async () => {
        const queryParams = new URLSearchParams()

        // 타겟 필터를 쿼리 파라미터에 추가
        selectedTargets.forEach((target) => {
            queryParams.append('targets', target)
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

    // 필터, 페이지, 정렬이 변경될 때마다 데이터 다시 가져오기
    useEffect(() => {
        fetchFilteredProjectGallery()
    }, [selectedTargets, currentPage, pageSize, sortType])

    // 타겟 필터를 선택하거나 해제하는 함수
    const handleFilterSelect = (target: string) => {
        setSelectedTargets((prevTargets) => {
            if (prevTargets.includes(target)) {
                // 이미 선택된 타겟이면 필터 해제
                return prevTargets.filter((t) => t !== target)
            } else {
                // 선택되지 않은 타겟이면 필터 추가
                return [...prevTargets, target]
            }
        })
    }

    return (
        <div className="flex flex-col items-start gap-[0.5rem] self-stretch">
            {/* 필터 버튼 */}
            <div className="flex flex-wrap items-center gap-[0.5rem] self-stretch">
                {TargetObject.map((target) => (
                    <LableBtn
                        key={target}
                        text={target}
                        onClick={() => handleFilterSelect(target)}
                    />
                ))}
            </div>
        </div>
    )
}

export async function GetProjectGalleryFiltering(accessToken: string, url: string) {
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
