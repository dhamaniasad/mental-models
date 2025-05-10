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
  // Configuration optimized for Cloudflare Pages
  output: 'export',
  // Better performance by disabling unnecessary features
  poweredByHeader: false,
  // Improve build speeds
  staticPageGenerationTimeout: 300,
  // Needed for Cloudflare Pages deployment
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
