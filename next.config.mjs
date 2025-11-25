/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_ERP_API_BASE_URL: process.env.NEXT_PUBLIC_ERP_API_BASE_URL,
    NEXT_PUBLIC_ERP_API_KEY: process.env.NEXT_PUBLIC_ERP_API_KEY,
  },
  async rewrites() {
    const erpApiBaseUrl = process.env.NEXT_PUBLIC_ERP_API_BASE_URL || 'https://erp.fashionpos.space';
    return [
      {
        source: '/api/erp/:path*',
        destination: `${erpApiBaseUrl}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
