// app/layout.tsx

import { Metadata } from 'next'
import localFont from 'next/font/local'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'

import './globals.css'

import ClientProvider from '@/components/common/ClientProvider'
import FetchSetting from '@/components/common/fetch/page'

export const metadata: Metadata = {
  title: 'Aurora',
  description: '사회 문제 해결의 시작은, 오로라에서',
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'Aurora',
    description: '사회 문제 해결의 시작은, 오로라에서',
    siteName: 'Aurora',
    locale: 'ko_KR',
    type: 'website',
    url: 'https://myaurora.co.kr',
    images: {
      url: '/logo.png',
    },
  },
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
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${museomoderno.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body className={`${pretendard.className} bg-[#fff]`}>
        <ClientProvider>
          {/* <FetchSetting> */}
            <Header />
            <div className="bg-[#F4F6FA]">{children}</div>
            <Footer />
          {/* </FetchSetting> */}
        </ClientProvider>
      </body>
    </html>
  )
}
