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
  // OpenNext will handle the output configuration
  experimental: {
    // This enables middleware and server components to work with OpenNext
    serverComponentsExternalPackages: [],
    // This enables app router navigation
    appDocumentPreloading: true
  },
  // Enhanced built-in client-side caching
  staticPageGenerationTimeout: 180,
  // Improve build speeds by reusing cached builds
  poweredByHeader: false,
};

export default nextConfig;
