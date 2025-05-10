// @ts-check
const { defineCloudflareConfig } = require("@opennextjs/cloudflare");

/**
 * @type {import('@opennextjs/cloudflare').CloudflareConfig}
 */
module.exports = defineCloudflareConfig({
  // Automatically detect Node.js compatibility issues
  checkCompatibility: true,
  
  // Configure caching behavior
  cache: {
    // Cache dynamic responses with custom caching rules
    dynamic: {
      // Set default max-age for dynamic responses
      defaultMaxAge: 60, // 1 minute
      // Use stale-while-revalidate to improve performance
      staleWhileRevalidate: 60, // 1 minute
    },
    // Configure static asset caching
    assets: {
      // Cache static assets with a longer TTL
      maxAge: 31536000, // 1 year
      // Use stale-while-revalidate for static assets too
      staleWhileRevalidate: 86400, // 1 day
    },
  },
  
  // Configure custom headers
  headers: [
    {
      // Apply these headers to all HTML responses
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
      ],
    },
  ],
});