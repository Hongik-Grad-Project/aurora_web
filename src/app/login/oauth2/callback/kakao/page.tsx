import React, { Suspense } from 'react'
import KakaoRedirect from '@/components/Login/KakaoRedirect'

const KakaoRedirectPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <KakaoRedirect />
      </Suspense>
    )
}

export default KakaoRedirectPage
