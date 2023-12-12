import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from 'next/link'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import ProductCard from "components/organisms/ProductCard";
import ProductCardCarousel from 'components/organisms/ProductCardCarousel'
import Layout from 'components/templates/Layout'
import TableContainer from 'components/molecules/TableContainer'
import getAllProducts from 'services/products/get-all-product'
import { ApiContext, Product } from "types/data";
import { getUserStaticProps } from "./users/[id]";
import { styled } from "styled-components";
// import Button from 'components/atoms/Button'
import Drawer from "components/molecules/Drawer";
import { useDrawer } from "utils/hooks";
import { useRef, useState } from "react";
import Button from "@mui/material/Button";

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>

const HomePage: NextPage<HomePageProps> =({
    bookProducts,
    clothesProducts,
    shoesProducts,
}: HomePageProps) => {
    const tableContainerRef = useRef();
    /** 詳細ボタン */
    const detailDrawer = useDrawer();
    const [ product, setProduct ] = useState({});

    const updateProduct = (event: any, product: Product) => {
        detailDrawer.isOpen = true
        setProduct(product);
    }

    // const renderProductCardCarousel = (products: Product[]) => {
    //     return (
    //         <ProductCardCarousel>
    //             {products.map((p: Product, i: number) => (
    //                 <Box paddingLeft={i === 0 ? 0 : 2} key={p.id}>
    //                     <Link href={`/products/#{p.id}`} passHref>
    //                         <ProductCard
    //                             variant="small"
    //                             title={p.title}
    //                             price={p.price}
    //                             blurDataUrl={p.blurDataUrl}
    //                             imageUrl={p.imageUrl}
    //                         />
    //                     </Link>
    //                 </Box>
    //             ))}
    //         </ProductCardCarousel>
    //     )
    // }

    return (
        <Layout>
            {/* <Box
                marginLeft={{ base: 2, md: 0 }}
                marginRight={{ base: 2, md: 0 }}
                width={{ base: '100%', md: '1040px'}}
            > */}
            <TableContainer data={clothesProducts} updateProduct={updateProduct} />
            <Drawer isOpen={detailDrawer.isOpen} onClose={detailDrawer.onClose} >
                {/* 詳細ページを埋め込む */}
                <div>test</div>
            </Drawer>
                {/* <Box marginBottom={3}>
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
                </Box> */}
            {/* </Box> */}
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