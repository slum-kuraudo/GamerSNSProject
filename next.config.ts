import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images:{
    domains: ['images.igdb.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.igdb.com',
        port: '443',
        pathname: '/igdb/image/upload/t_',
        search: '.*'
      },
      {
        protocol: 'https',
        hostname: 'uyehbdnaojwdxrrzdwat.supabase.co'
      }
    ]
  },
};

export default nextConfig;
