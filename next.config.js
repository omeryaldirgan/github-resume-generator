/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
  }
};

module.exports = nextConfig; 