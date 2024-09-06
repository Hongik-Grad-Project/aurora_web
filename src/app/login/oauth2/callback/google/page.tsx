import React, { Suspense } from 'react'
import GoogleRedirect from '@/components/Login/GoogleRedirect'

const GoogleRedirectPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <GoogleRedirect />
      </Suspense>
    )
}

export default GoogleRedirectPage