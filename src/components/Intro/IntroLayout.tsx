'use client'
import FooterComponent from '../Layout/FooterComponent'
import Landing1 from './1_0_Landing/Landing1'
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export default function IntroLayout() {
    return (
        <div className="flex h-screen w-full snap-y snap-mandatory flex-col overflow-y-scroll">
          <Landing1 />
          <div className="h-screen snap-start">
            <FooterComponent />
          </div>
        </div>
      )
}