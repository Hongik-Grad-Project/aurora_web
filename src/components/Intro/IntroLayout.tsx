'use client'

import { useEffect } from 'react'
import FooterComponent from '../Layout/FooterComponent'
import Landing1 from './1_0_Landing/Landing1'
import Landing2 from './1_0_Landing/Landing2'
import Landing3 from './1_0_Landing/Landing3'
import Landing4 from './1_0_Landing/Landing4'
import Landing5 from './1_0_Landing/Landing5'
import Landing6 from './1_0_Landing/Landing6'
import Landing7 from './1_0_Landing/Landing7'
import Landing8 from './1_0_Landing/Landing8'

import { useRecoilValue } from 'recoil'
import { authState } from '@/context/recoil-context'

export default function IntroLayout() {
  const isAuth = useRecoilValue(authState)
    return (
        <div className="flex h-screen w-full snap-y snap-mandatory flex-col overflow-y-scroll">
          <Landing1 />
          <Landing2 />
          <Landing3 />
          <Landing4 />
          <Landing5 />
          <Landing6 />
          <Landing7 />
          <Landing8 />
          <div className="h-screen snap-start">
            <FooterComponent />
          </div>
        </div>
      )
}