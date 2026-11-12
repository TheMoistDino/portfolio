import { existsSync } from "node:fs";
import type { NextConfig } from "next";

const has = (file: string) => (existsSync(`public/${file}`) ? "1" : "");

const nextConfig: NextConfig = {
  // Static export for GitHub Pages: `next build` writes the site to `out/`.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // The resume and CV download options show up once their PDFs exist in public/.
  env: {
    NEXT_PUBLIC_HAS_RESUME: has("resume.pdf"),
    NEXT_PUBLIC_HAS_CV: has("cv.pdf"),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
