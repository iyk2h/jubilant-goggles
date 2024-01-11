/** @type {import('next').NextConfig} */
const nextConfig = {};

const withNextIntl = require("next-intl/plugin")("./i18n.js");

module.exports = withNextIntl({
  images: {
    domains: ["www.avcodes.co.uk"],
  },
});
