/** @type {import('next').NextConfig} */

const environment = process.env.APP_ENV || "http://localhost:4000";

if (!environment) {
  throw new Error(`APP_ENV: ${environment} is not a recognized environment.`);
}
const nextConfig = {
  env: {
    path: "http://localhost:4000",
  },
  serverRuntimeConfig: {
    ...[environment].server,
    BASE_PATH: process.env.basePath || "http://localhost:4000",
  },
  publicRuntimeConfig: {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "http://localhost:3000",
  },
};

export default nextConfig;
