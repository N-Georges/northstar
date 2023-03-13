/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr-BE", "nl-BE"],
    defaultLocale: "en",
  },
  images: {
    domains: ["images.unsplash.com", "www.gravatar.com"],
  },
};

module.exports = nextConfig;
