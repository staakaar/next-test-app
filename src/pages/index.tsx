import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Layout from 'components/templates/Layout'
import ProductTableContainer from 'components/molecules/TableContainer'
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

const HomePage: NextPage<HomePageProps> =(products: HomePageProps) => {

    console.log(products)

    return (
        <Layout>
            <ProductTableContainer data={products} />
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const context: ApiContext = {
        apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
    }

    const products = await getAllProducts(context)
    // console.log(typeof products)
    console.log(products)

    return {
        props: {
            products,
        },
        revalidate: 60,
    }
}

export default HomePage