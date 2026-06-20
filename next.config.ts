import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Ideal for simple exports and static serving
  },
};

export default nextConfig;
