/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['ja', 'en'],
        defaultLocale: 'jp',
        domains: [
            {
                domain: 'example.jp',
                defaultLocale: 'ja',
            },
            {
                domain: 'example.com',
                defaultLocale: 'en',
            },
        ],
    },
    compiler: (() => { 
        let compilerConfig = {
            styledComponents: true,
        }

        if (process.env.NODE_ENV === 'production') {
            compilerConfig = {
                ...compilerConfig,
                reactRemoveProperties: { properties: ['^data-testid$']},
            }
        }

        return compilerConfig
    })(),
    async rewrites() {
        return [
            {
                source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:match*`,
                destination: `${process.env.API_BASE_URL}`,
            },
        ]
    },
}

export default nextConfig
