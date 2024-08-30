'use client'
import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, authState, filteredProjectGalleryState } from '@/context/recoil-context'

import LableBtn from "./Lable"
import exp from 'constants'
import { set } from 'date-fns'
import { TargetObject } from '@/lib/data'

export default function GalleryCategoryNav() {
    const accessToken = useRecoilValue(accessTokenState) || ''
    const isAuth = useRecoilValue(authState)
    const [filteredProjectGallery, setFilteredProjectGallery] = useRecoilState(filteredProjectGalleryState)
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
        category: []
    })

    const fetchFilteredProjectGallery = async () => {
        const queryParams = new URLSearchParams()
        Object.entries(selectedFilters).forEach(([key, values]) => {
            values.forEach((value) => {
                queryParams.append(key, value)
            })
        })

        const query = queryParams.toString()

        if (isAuth) {
            const url = query ? '/gallery?${query}' : '/gallery'
            const response = await GetProjectGalleryFiltering(accessToken, url)
            setFilteredProjectGallery(response.content)
        } else if (!isAuth && !accessToken) {
            const url = query ? '/gallery?${query}' : '/gallery'
            const response = await GetProjectGalleryFiltering(accessToken, url)
            setFilteredProjectGallery(response.content)

        }
    }

    useEffect(() => {
        fetchFilteredProjectGallery()
    }, [selectedFilters])

    useEffect(() => {
        fetchFilteredProjectGallery()
    }, [isAuth])

    return (
        <div className="flex flex-col items-start gap-[0.5rem] self-stretch">
            <div className="flex flex-wrap items-center gap-[0.5rem] self-stretch">
                {TargetObject.map((target) => (
                    <LableBtn key={target} text={target} />
                ))}
            </div>
        </div>
    )
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
        throw new Error('Failed to fetch filtered team members')
    }

    return await response.json()
}