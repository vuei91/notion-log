/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.notion.so",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
