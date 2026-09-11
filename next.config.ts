import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The products catalogue folded into the one map of the work; the
      // Royto Social package page keeps its URL.
      { source: "/products", destination: "/what-we-automate", permanent: true },
    ];
  },
};

export default nextConfig;
