/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export works on Vercel (and local `serve out` / GitHub Pages).
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
