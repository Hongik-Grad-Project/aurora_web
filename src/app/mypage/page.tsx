import MyProfile from '@/components/MyPage/MyProfile'
import MyProject from '@/components/MyPage/MyProject'
import MyUnderpinProject from '@/components/MyPage/MyUnderpinProject'

export default function MyPage() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex w-[56.25rem] flex-col items-start gap-[5rem] mt-[5rem] pt-[5.91rem]">            
                <MyProfile />
                <MyProject />
                <MyUnderpinProject />
            </div>
        </div>
    )
}