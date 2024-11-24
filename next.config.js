const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
    ],
  },
});

module.exports = nextConfig;
