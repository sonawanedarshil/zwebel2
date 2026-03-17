/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'logo.clearbit.com'],
    unoptimized: true,
  }
}

module.exports = nextConfig