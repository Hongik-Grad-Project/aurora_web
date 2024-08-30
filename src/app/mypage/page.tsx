'use client'

import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { GetMyPage } from '@/lib/action'
import MyProfile from '@/components/MyPage/MyProfile'
import MyProject from '@/components/MyPage/MyProject'
import MyUnderpinProject from '@/components/MyPage/MyUnderpinProject'
import { MyPageResponse, MyProfileData, MyProjectData, MyLikeProjectData } from '@/lib/types'
import Footer from '@/components/Layout/Footer'

export default function MyPage() {
    const accessToken = useRecoilValue(accessTokenState) || ''
    const [myProfile, setMyProfile] = useState<MyProfileData | null>(null)
    const [myProjects, setMyProjects] = useState<MyProjectData[]>([])
    const [likeProjects, setLikeProjects] = useState<MyLikeProjectData[]>([])

    useEffect(() => {
        const GetMyPageData = async () => {
            try {
                const data: MyPageResponse = await GetMyPage(accessToken)
                setMyProfile(data.myProfile)
                setMyProjects(data.myProjects)
                setLikeProjects(data.likeProjects)
            } catch (error) {
                console.error('Failed to fetch my page data:', error)
            }
        }
        GetMyPageData()
    }, [accessToken])

    return (
        <div className="flex w-full flex-col justify-center items-center pt-[70px] bg-[#fff]">
            <div className="flex w-[56.25rem] flex-col items-start gap-[5rem] pt-[5.91rem]">
                <MyProfile profileData={myProfile} />
                <MyProject projectData={myProjects} />
                <MyUnderpinProject likeProjectData={likeProjects} />
            </div>
            <Footer />
        </div>
    )
}