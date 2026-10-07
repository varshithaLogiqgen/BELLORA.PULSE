/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow a verification build alongside a running development server.
  distDir: process.env.AI_PULSE_BUILD_DIR || '.next',
  reactStrictMode: true,
  images: {
    // Publisher images are hot-linked from arbitrary hosts, so the Next image
    // optimizer is not used for them (see ArticleImage). This block only keeps
    // remote patterns permissive if the optimizer is enabled later.
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
