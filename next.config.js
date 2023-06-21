/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["https://dummyjson.com", "i.dummyjson.com"],
  },
};

module.exports = nextConfig;
