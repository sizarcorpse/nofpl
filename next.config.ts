import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL(
        "https://storage.googleapis.com/plfpl-production-adobe-approved/plfpl-production/**"
      ),
      new URL("https://resources.premierleague.com/**"),
    ],
  },
};

export default nextConfig;
