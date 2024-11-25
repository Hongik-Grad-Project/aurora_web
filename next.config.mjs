/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 개발 모드에서 Strict Mode를 비활성화
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.myaurora.co.kr',
      },
      {
        protocol: 'https',
        hostname: 'trackers-aurora-dev-bucket.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
