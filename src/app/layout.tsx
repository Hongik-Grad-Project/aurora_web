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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={`${pretendard.className} bg-[#fff]`}>
        <ClientProvider>
          <FetchSetting>
            <Header />
            <div className="bg-grey10">{children}</div>
            <Footer />
          </FetchSetting>
        </ClientProvider>
      </body>
    </html>
  )
}
