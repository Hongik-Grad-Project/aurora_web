'use client'

import React, { Suspense } from 'react'
import NaverRedirect from '@/components/Login/NaverRedirect'

const NaverRedirectPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <NaverRedirect />
      </Suspense>
    )
}

export default NaverRedirectPage
