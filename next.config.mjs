/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local images live in /public/images. Default Next/Image optimization
    // is used on Vercel. Add remote patterns here if originals move to a CDN.
    formats: ["image/avif", "image/webp"],
  },
  // 2026-09-23: private clients' names removed from URLs (brand rule: venue and
  // occasion, never the client). Old links 301 to the new ones so nothing
  // already shared or indexed breaks, and Google swaps the old URL out.
  async redirects() {
    return [
      { source: "/work/rob-leah-wedding", destination: "/work/wedding-moyres-venue", permanent: true },
      { source: "/work/malinga-40th", destination: "/work/milestone-40th-birthday", permanent: true },
    ];
  },
};

export default nextConfig;
