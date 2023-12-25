/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: false
});

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: []
  },
  compiler: {
    styledComponents: true
  },
  async redirects() {
    return [];
  }
};

module.exports = withPWA(nextConfig);
// module.exports = nextConfig;
