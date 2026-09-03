import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.ISOLATED_BUILD === 'true' ? '.next-isolated' : '.next',
};

export default nextConfig;
