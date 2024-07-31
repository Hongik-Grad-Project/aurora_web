// Banner.tsx
'use client'
import { useState, useEffect } from 'react'

interface BannerProps {
  imgSrc: string
  title: string
  description: string
  scrolledTitle: string
  scrolledDescription: string
}

export default function Banner({ imgSrc, title, description, scrolledTitle, scrolledDescription }: BannerProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        height: isScrolled ? '4rem' : '18.375rem',
        transition: 'height 0.3s ease',
        position: 'fixed',
        top: '5rem',
        width: '100%',
        display: 'flex'
      }}
      className="transition-all duration-300"
    >
      <div
        className="flex w-full flex-col text-left transition-all duration-300" // Center text horizontally
      >
        {isScrolled ? (
          <>
            <div className="flex flex-row gap- pt-[1rem] ml-[6.5rem]">
              <p className="text-[1.25rem] font-medium text-[#FFFFFF] opacity-80">{scrolledTitle}</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col pt-[5.5rem] ml-[6.5rem]">
              <p className="text-[1.25rem] font-medium text-[#FFFFFF] opacity-80">{title}</p>
              <p className="text-[2.5rem] font-normal text-[#FEFEFE]">
                <span>
                  이제 행동으로 <br/> 옮길 일만 남았어요
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
