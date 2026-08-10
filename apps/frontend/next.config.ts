import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["contract-client", "utils"],
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "https://oobayemi.gitbook.io/pulsepay",
        permanent: false,
      },
      {
        source: "/docs/:path*",
        destination: "https://oobayemi.gitbook.io/pulsepay",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
