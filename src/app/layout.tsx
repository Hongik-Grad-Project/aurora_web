// app/layout.tsx

import { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Header from '@/components/Layout/Header'
import 'react-datepicker/dist/react-datepicker.css';

import './globals.css'

import { NavigationProvider } from '@/context/NavigationContext'
import 'react-toastify/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'Aurora',
  description: '문제 발굴부터 해결책 검증까지',
  icons: {
    icon: './logo.png',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://myaurora.co.kr'),
  openGraph: {
    title: 'Aurora',
    description: '문제 발굴부터 해결책 검증까지',
    siteName: 'Aurora',
    locale: 'ko_KR',
    type: 'website',
    url: 'https://myaurora.co.kr',
    images: [{
      url: './aurora_logo.png', // 절대 경로로 변경
      width: 750,
      height: 400,
      alt: 'Aurora',
    }],
  }
}

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

const museomoderno = localFont({
  src: './fonts/MuseoModerno-VariableFont_wght.ttf',
  display: 'swap',
  weight: '45 920',
  variable: '--font-museomoderno',
})


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${museomoderno.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body className={`${pretendard.className} bg-[#fff]`}>
        <NavigationProvider>
          {/* <FetchSetting> */}
          <Header />
          <ToastContainer
            style={{
              width: '250px', // Width of the container
              display: 'inline-flex', // Make it inline-flex to manage alignment and direction
              minHeight: '56px', // Minimum height
              justifyContent: 'center', // Center items horizontally in the container
              alignItems: 'center', // Center items vertically in the container
              gap: '20px', // Gap between items in the container
            }}
          />
          <div className="bg-[#F4F6FA]">{children}</div>
          {/* </FetchSetting> */}
        </NavigationProvider> 
      </body>
    </html>
  )
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  maximumScale: 1,
  viewportFit: 'cover',
}