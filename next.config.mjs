/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // 개발 모드에서 Strict Mode를 비활성화
    images: {
      domains: ['image.myaurora.co.kr'], // 여기에 외부 이미지 도메인을 추가합니다.
    },
  }
  
  export default nextConfig
  