'use client'

import FooterComponent from '../Layout/FooterComponent'
import Landing2 from './1_0_Landing/Landing2'
import Landing3 from './1_0_Landing/Landing3'
import Landing4 from './1_0_Landing/Landing4'
import Landing5 from './1_0_Landing/Landing5'
import Landing6 from './1_0_Landing/Landing6'
import Landing7 from './1_0_Landing/Landing7'
import Landing8 from './1_0_Landing/Landing8'

export default function IntroLayout() {
    return (
        <div className="flex h-screen w-full snap-y snap-mandatory flex-col overflow-y-scroll">
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