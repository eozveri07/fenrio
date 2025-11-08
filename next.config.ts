import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/*",
          headers: [
            {
              key: "Cache-Control",
              value: "no-store, no-cache, must-revalidate, proxy-revalidate",
            },
          ],
        },
      ];
    }
    return [];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig as NextConfig);
