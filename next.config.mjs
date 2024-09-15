/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // 개발 모드에서 Strict Mode를 비활성화
    images: {
      domains: ['image.myaurora.co.kr', 'trackers-aurora-dev-bucket.s3.ap-northeast-2.amazonaws.com'], // 여기에 외부 이미지 도메인을 추가합니다.
    },
  }
  
  export default nextConfig
  