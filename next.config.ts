import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The products catalogue folded into the one map of the work; the
      // Royto Social package page keeps its URL.
      { source: "/products", destination: "/what-we-automate", permanent: true },
      // Package pages live on flat URLs; the trade page folded into the homepage.
      { source: "/products/royto-social", destination: "/royto-social", permanent: true },
      { source: "/home-services", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
