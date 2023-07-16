/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://rom1.samssh.ir:8080/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
