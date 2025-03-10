/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/google-reviews/:path*',
        destination: 'https://maps.googleapis.com/maps/api/place/details/json/:path*', // Proxy to Google API
      },
    ]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['res.cloudinary.com']
  }
};

export default nextConfig;
