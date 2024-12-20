'use client'

import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { accessTokenState, authState } from '@/context/recoil-context'
import { GetMyPage } from '@/lib/action'
import MyProfile from '@/components/MyPage/MyProfile'
import MyProject from '@/components/MyPage/MyProject'
import MyUnderpinProject from '@/components/MyPage/MyUnderpinProject'
import { MyPageResponse, MyProfileData, MyProjectData, MyLikeProjectData } from '@/lib/types'
import Footer from '@/components/Layout/Footer'
import LoginModal from '@/components/Login/LoginModal'
import { useNavigation } from '@/context/NavigationContext'

export default function MyPage() {
    const accessToken = useRecoilValue(accessTokenState);
    const isAuth = useRecoilValue(authState)
    const [myProfile, setMyProfile] = useState<MyProfileData | null>(null)
    const [myProjects, setMyProjects] = useState<MyProjectData[]>([])
    const [likeProjects, setLikeProjects] = useState<MyLikeProjectData[]>([])
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false) // 로그인 모달 상태
    const { previousPath, setPreviousPath } = useNavigation();
    
    useEffect(() => {
        const GetMyPageData = async () => {
            try {
                if (!accessToken) return;
                const data: MyPageResponse = await GetMyPage(accessToken)
                setMyProfile(data.myProfile)
                setMyProjects(data.myProjects)
                setLikeProjects(data.likeProjects)
                setPreviousPath('/mypage')
            } catch (error) {
                console.error('Failed to fetch my page data:', error)
            }
        }
        GetMyPageData()
    }, [accessToken, setPreviousPath])

    if (!isAuth) {
        // 로그인 모달이 열리도록 설정
        return <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    }

    return (
        <div className="flex w-full flex-col justify-center items-center pt-[70px] bg-[#fff]">
            <div className="flex w-full max-w-[56.25rem] flex-col items-start gap-[3rem] sm:gap-[5rem] px-4 sm:px-8 lg:px-0 pt-[2.91rem]">
                <div className="w-full">
                    <MyProfile profileData={myProfile} />
                </div>
                <div className="w-full">
                    <MyProject projectData={myProjects} />
                </div>
                <div className="w-full">
                    <MyUnderpinProject likeProjectData={likeProjects} />
                </div>
            </div>
            <Footer />
        </div>
    )
}