/** @type {import('next').NextConfig} */
const nextConfig = {};

const withNextIntl = require("next-intl/plugin")("./i18n.js");

module.exports = withNextIntl({
  images: {
    remotePatterns: [
      {
        hostname: "www.avcodes.co.uk",
        pathname: "**",
      },
      {
        hostname: "developers.kakao.com",
        pathname: "**",
      },
    ],
  },
});
