import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/pdf/**": [
      "./node_modules/playwright-core/**",
    ],
  },
};

export default nextConfig;