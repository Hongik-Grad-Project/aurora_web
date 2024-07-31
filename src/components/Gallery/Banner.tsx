// Banner.tsx
'use client'

interface BannerProps {
    imgSrc: string
    title: string
}

export default function Banner({imgSrc, title,}: BannerProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        height: '18.375rem',
        position: 'fixed',
        top: '5rem',
        width: '100%',
        display: 'flex',
    }} >
      <div className="flex w-[18.6875rem] flex-col pt-[5.5rem] items-start ml-[6.5rem]">
            <div className="flex w-[18.6875rem] flex-col">
                <p className="text-[#FFFFFF] text-[1.25rem] font-medium opacity-80"> {title} </p>
                <p className="text-[#FEFEFE] text-[2.5rem] font-normal">
                    이제 행동으로<br />옮길 일만 남았어요
                </p>
            </div>
      </div>
    </div>
  )
}
