/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.cosmicjs.com', 'imgix.cosmicjs.com'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    typedRoutes: false,
  },
}

module.exports = nextConfig