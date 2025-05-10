import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning instead of error during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors
    ignoreBuildErrors: true,
  },
  // Optimized for Cloudflare Pages deployment
  output: 'export',
  // Disable image optimization since Cloudflare Pages doesn't support it
  images: {
    unoptimized: true,
  },
  // Disable React strict mode in production for better performance
  reactStrictMode: process.env.NODE_ENV !== 'production',
};

export default nextConfig;
