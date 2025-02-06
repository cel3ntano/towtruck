import nextIntl from "next-intl/plugin";
import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    domains: ["localhost", "127.0.0.1", "admin.towtruck.altiment.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "admin.towtruck.altiment.com",
        pathname: "/uploads/**",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/uk",
        permanent: true,
      },
    ];
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

const withNextIntl = nextIntl("./i18n.ts");
export default withNextIntl(config);
