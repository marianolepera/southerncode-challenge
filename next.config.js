/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_ENDPOINT: "https://api.nasa.gov/mars-photos/api/v1/rovers",
        NEXT_PUBLIC_API_KEY: "KNACAwbLzOsFDE7LxcwcO6kX4Mtg1qJjHT2coisv"
    },
}

module.exports = nextConfig
