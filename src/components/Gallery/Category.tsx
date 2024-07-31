'use client'

import LableBtn from "./Lable"

export default function categoryNav(){
    return (
        <div className="flex gap-[0.5rem] mb-[2.37rem]">
            <LableBtn text="전체"/>
            <LableBtn text="여성"/>
            <LableBtn text="지구촌"/>
            <LableBtn text="유기동물"/>
            <LableBtn text="주거 개선"/>
            <LableBtn text="어려운 이웃"/>
            <LableBtn text="장애인 시절"/>
            <LableBtn text="장애인"/>
            <LableBtn text="청년"/>
            <LableBtn text="아동 | 청소년"/>
            <LableBtn text="이주민 | 다문화"/>
        </div>
    )
}