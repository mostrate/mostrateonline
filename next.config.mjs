/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    localPatterns: [
      { pathname: "/previews/**", search: "?v=20261028" },
      { pathname: "/**", search: "" },
    ],
  },
};

export default nextConfig;
