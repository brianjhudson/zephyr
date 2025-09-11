import type { ImageLoaderProps } from "next/image";

function normalizeSrc(src: string): string {
  // For external URLs, remove the protocol to work with Cloudflare Images
  if (src.startsWith("https://")) {
    return src.replace("https://", "");
  }
  if (src.startsWith("http://")) {
    return src.replace("http://", "");
  }
  // For relative URLs, add leading slash
  return src.startsWith("/") ? src : `/${src}`;
}

export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps): string {
  // During development, serve original images
  if (process.env.NODE_ENV === "development") {
    return src;
  }

  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  
  const paramsString = params.join(",");
  const normalizedSrc = normalizeSrc(src);
  
  return `/cdn-cgi/image/${paramsString}/${normalizedSrc}`;
}