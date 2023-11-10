/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["res.cloudinary.com", "daisyui.com"],
  },
});

module.exports = nextConfig;
