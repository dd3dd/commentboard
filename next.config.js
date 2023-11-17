import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com"],
    },
};

module.exports = nextConfig;
