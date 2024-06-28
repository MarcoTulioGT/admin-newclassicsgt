/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'storage.googleapis.com',
            port: '',
            pathname: '/xfamily-xmanager/**',
          },
        ],
      },
};

export default nextConfig;
