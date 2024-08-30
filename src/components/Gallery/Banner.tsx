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
      className="w-full px-4 transition-all duration-300 lg:px-2"
    >
      <div
        className="flex flex-col text-left transition-all duration-300 lg:w-[64rem] lg:pl-4" // 텍스트 왼쪽 padding 조정
      >
        <div className="flex flex-col">
          <p className="text-2xl font-bold text-grey90 lg:text-4xl">{title}</p>
          <p className="text-2xl font-bold text-grey90 lg:text-4xl">{subTitle}</p>
        </div>
      </div>
    </div>
  )
}
