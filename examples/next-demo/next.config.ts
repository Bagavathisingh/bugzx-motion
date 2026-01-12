import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ["@bugzx-motion/next", "@bugzx-motion/core", "@bugzx-motion/ui"],
};

export default nextConfig;
