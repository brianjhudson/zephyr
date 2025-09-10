import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "zephyr-images.brianjhudson.com"],
  },
  remotePatterns: [
    {
      protocol: "https",
      hostname: "zephyr-images.brianjhudson.com", // Or your custom Cloudflare Images domain
      port: "",
      pathname: "/**", // Allow all paths under the hostname
    },
  ],
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
