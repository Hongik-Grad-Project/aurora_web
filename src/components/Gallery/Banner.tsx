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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      className="w-full h-[4rem] md:h-[6rem] pl-[1.5rem] md:pl-[3rem] transition-all duration-300"
    >
      <div className="flex flex-col text-left transition-all duration-300">
        <div className="flex flex-col">
          <p 
            className="text-[0.8rem] md:text-[1.2rem] font-medium text-white leading-[120%] md:leading-[150%]"
            style={{
              fontFamily: 'Pretendard',
              fontStyle: 'normal',
              fontWeight: 500,
              color: '#FFF',
            }}
          >
            {title}
          </p>
          <p 
            className="text-[1rem] md:text-[1.4rem] font-semibold text-white leading-[120%] md:leading-[150%]"
            style={{
              fontFamily: 'Pretendard',
              fontStyle: 'normal',
              fontWeight: 600,
              color: '#FEFEFE',
            }}
          >
            {subTitle}
          </p>
        </div>
      </div>
    </div>
  )
}
