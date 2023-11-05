import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from 'next/link'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import ProductCard from "components/organisms/ProductCard";
import ProductCardCarousel from 'components/organisms/ProductCardCarousel'
import Layout from 'components/templates/Layout'
import getAllProducts from 'services/products/get-all-product'
import { ApiContext, Product } from "types/data";
import { getUserStaticProps } from "./users/[id]";
import { styled } from "styled-components";
import Button from 'components/atoms/Button'

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>

const HomePage: NextPage<HomePageProps> =({
    bookProducts,
    clothesProducts,
    shoesProducts,
}: HomePageProps) => {
    const renderProductCardCarousel = (products: Product[]) => {
        return (
            <ProductCardCarousel>
                {products.map((p: Product, i: number) => (
                    <Box paddingLeft={i === 0 ? 0 : 2} key={p.id}>
                        <Link href={`/products/#{p.id}`} passHref>
                            <ProductCard
                                variant="small"
                                title={p.title}
                                price={p.price}
                                blurDataUrl={p.blurDataUrl}
                                imageUrl={p.imageUrl}
                            />
                        </Link>
                    </Box>
                ))}
            </ProductCardCarousel>
        )
    }

    return (
        <Layout>
            <Button variant="primary" color="primary" height="40px" width="100px">
                新規作成
            </Button>
            <Box
                marginLeft={{ base: 2, md: 0 }}
                marginRight={{ base: 2, md: 0 }}
                width={{ base: '100%', md: '1040px'}}
            >
                <Box marginBottom={3}>
                    <Text as="h2" variant="large">
                        トップス
                    </Text>
                    {renderProductCardCarousel(clothesProducts)}
                </Box>
                <Box marginBottom={3}>
                    <Text as="h2" variant="large">
                        本
                    </Text>
                    {renderProductCardCarousel(bookProducts)}
                </Box>
                <Box marginBottom={3}>
                    <Text as="h2" variant="large">
                        シューズ
                    </Text>
                    {renderProductCardCarousel(shoesProducts)}
                </Box>
            </Box>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const context: ApiContext = {
        apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
    }

    const [clothesProducts, bookProducts, shoesProducts] = await Promise.all([
        getAllProducts(context, { category: 'clothes', limit: 6, page: 1}),
        getAllProducts(context, { category: 'book', limit: 6, page: 1 }),
        getAllProducts(context, { category: 'shoes', limit: 6, page: 1 }),
    ])

    return {
        props: {
            clothesProducts,
            bookProducts,
            shoesProducts,
        },
        revalidate: 60,
    }
}

export default HomePage