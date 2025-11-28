/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: ['res.cloudinary.com'], // replace with your Cloudinary cloud name if different
  },
};

export default nextConfig;
