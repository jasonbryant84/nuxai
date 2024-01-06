/* eslint-disable */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['nux-runs.s3.us-east-2.amazonaws.com'], // allow list for image paths
  },
};

module.exports = nextConfig;
