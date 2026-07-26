import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimized for production deployment on Vercel
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
