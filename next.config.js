/** @type {import('next').NextConfig} */
const nextConfig = {

  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://bookbuzz.cronhex.com/api/v1/:path*'
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["http://bookbuzz.cronhex.com"],
  },
};

module.exports = nextConfig;
