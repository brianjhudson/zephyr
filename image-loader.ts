import type { ImageLoaderProps } from "next/image";

function normalizeSrc(src: string): string {
  return src.startsWith("https://") || src.startsWith("http://") ? src : `/${src}`;
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