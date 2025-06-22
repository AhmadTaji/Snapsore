// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// module.exports = {
//   images: {
//     domains: ['images.unsplash.com', 'cdn.pixabay.com'], // add any image hosts you use
//   },
// };
// module.exports = {
//   images: {
//     domains: ['images.unsplash.com', 'cdn.pixabay.com'],
//   },
// };
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '**' }
    ],
  },
};
