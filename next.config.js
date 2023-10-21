/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    i18n: {
        locales: ['jp', 'en'],
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
