// Banner.tsx
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
        height: '18.375rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="w-full px-4 transition-all duration-300 lg:px-12"
    >
      <div
        className="flex flex-col text-left transition-all duration-300 lg:w-[64rem]" // Center text horizontally
      >
        <div className="flex flex-col">
          <p className="text-2xl font-bold text-grey90 lg:text-4xl">{title}</p>
          <p className="text-2xl font-bold text-grey90 lg:text-4xl">{subTitle}</p>
        </div>
      </div>
    </div>
  )
}
