// Banner.tsx
'use client'
import { useState, useEffect } from 'react'

interface BannerProps {
  imgSrc: string
  title: string
  subTitle: string
  scrolledTitle: string
}

export default function Banner({ imgSrc, title, subTitle, scrolledTitle }: BannerProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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
        height: isScrolled ? '8rem' : '18.375rem',
        transition: 'height 0.3s ease',
        position: 'fixed',
        // width: '100%',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="w-full px-4 transition-all duration-300 lg:px-12"
    >
      <div
        className="flex flex-col pt-12 text-left transition-all duration-300 lg:w-[64rem]" // Center text horizontally
      >
        {isScrolled ? (
          <>
            <div className="flex items-center gap-6 pt-3">
              <p className="text-xs font-bold text-grey90 md:text-[1.2rem]">{scrolledTitle}</p>
              <p className="text-xs text-grey90 md:text-lg">{subTitle}</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col pt-16">
              <p className="text-2xl font-bold text-grey90 lg:text-4xl">{title}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
