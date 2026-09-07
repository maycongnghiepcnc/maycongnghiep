import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.ISOLATED_BUILD === 'true' ? '.next-isolated' : '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
