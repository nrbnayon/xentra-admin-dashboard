import type { NextConfig } from "next";

const getHostname = (url: string | undefined) => {
  if (!url) return "**";
  try {
    return new URL(url).hostname;
  } catch {
    return "**";
  }
};

const apiHostname = getHostname(process.env.NEXT_PUBLIC_API_URL);

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore
  allowedDevOrigins: ["10.10.12.11"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: apiHostname,
      },
      {
        protocol: "http",
        hostname: apiHostname,
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
