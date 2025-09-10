import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "zephyr-images.brianjhudson.com"],
  },
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
