'use client'

interface BannerProps {
  imgSrc: string
  title: string
  subTitle: string
}

export default function Banner({ imgSrc, title, subTitle }: BannerProps) {

  return (
    <div
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        height: '8rem', // 세로 크기를 줄임
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="w-full px-4 transition-all duration-300 lg:px-4"
    >
      <div
        className="flex flex-col text-left transition-all duration-300 lg:w-[64rem] lg:pl-0" // 왼쪽 여백 제거
      >
        <div className="flex flex-col lg:pl-2"> {/* 텍스트를 왼쪽으로 조금 더 붙임 */}
          <p 
            className="text-[1.25rem] font-medium text-white leading-[1.875rem]" 
            style={{
              alignSelf: 'stretch',
              fontFamily: 'Pretendard',
              fontStyle: 'normal',
              fontWeight: 500,
              color: '#FFF',
              lineHeight: '150%',
            }}
          >
            {title}
          </p>
          <p 
            className="text-[2rem] font-semibold text-white leading-[3.25rem]"
            style={{
              fontFamily: 'Pretendard',
              fontStyle: 'normal',
              fontWeight: 600,
              color: '#FEFEFE',
              lineHeight: '130%',
            }}
          >
            {subTitle}
          </p>
        </div>
      </div>
    </div>
  )
}
