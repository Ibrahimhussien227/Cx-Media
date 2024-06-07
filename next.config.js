/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextIntl = require("next-intl/plugin")();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cx-media-s3.s3.amazonaws.com",
        port: "",
        pathname: "/asset-media-files/**",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
