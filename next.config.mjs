/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local images live in /public/images. Default Next/Image optimization
    // is used on Vercel. Add remote patterns here if originals move to a CDN.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
