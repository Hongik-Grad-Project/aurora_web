// app/layout.tsx

import { Metadata } from 'next'
import localFont from 'next/font/local'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import 'react-datepicker/dist/react-datepicker.css';

import './globals.css'

import ClientProvider from '@/components/common/ClientProvider'
import 'react-toastify/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

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
  hideFooter?: boolean // Optional prop to hide the footer
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
        </ClientProvider>
      </body>
    </html>
  )
}

