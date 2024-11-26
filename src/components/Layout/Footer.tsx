'use client'

import { usePathname } from 'next/navigation'
import FooterComponent from './FooterComponent'

export default function Footer() {
  const pathname = usePathname()
  const paths = [
    '/',
    '/chat'
  ]

  if (paths.includes(pathname)) return null

  return <FooterComponent />
}
