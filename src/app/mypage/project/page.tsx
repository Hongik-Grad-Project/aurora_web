'use client'

import Footer from '@/components/Layout/Footer'
import MyPageProjectList from '@/components/MyPage/MyPageProjectList'

export default function MyPageProjectPage() {
    return (
        <div className="flex w-full flex-col justify-center items-center pt-[70px]">
            <MyPageProjectList />
            <Footer />
        </div>
    )
}