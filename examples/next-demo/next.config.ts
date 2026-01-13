import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static export for Cloudflare Pages
  reactCompiler: true,
  transpilePackages: ["@bugzx-motion/next", "@bugzx-motion/core", "@bugzx-motion/ui"],
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
