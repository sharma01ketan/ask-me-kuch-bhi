/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.plane.so',
        port: '',
        pathname: '/imports/integrations/**', // Optional: restrict paths if needed
      },
    ],
  },
}

module.exports = nextConfig