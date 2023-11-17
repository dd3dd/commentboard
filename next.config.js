const dns = require("dns");

dns.setDefaultResultOrder("ipv4first")
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com"],
    },
    env: { NEXT_PUBLIC_API_URL: "https://commentboard.vercel.app" }
};

module.exports = nextConfig;
