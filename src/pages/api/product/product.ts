import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { context } from '../api';
import { Product } from 'types';

const productsApi = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({
        baseUrl: context.apiRootUrl
    }),
    tagTypes: ["Product", "UsersProduct"],
    endpoints(builder) {
        return {
            removeProduct: builder.mutation({
                invalidatesTags: (result, error, product) => {
                    return [{ type: 'Product', id: product.id }]
                },
                query: (product) => {
                    return {
                        url: `/products/${product.id}`,
                        method: 'DELETE',
                    };
                },
            }),
            addProduct: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{ type: 'UsersProduct', id: user.id }];
                },
                query: (product) => {
                    return {
                        url: '/products',
                        method: 'POST',
                        body: {
                            userId: product.id,
                            title: '',
                        }
                    }
                }
            }),
            fetchProducts: builder.query({
                providesTags: (result, error, user) => {
                    const tags = result.map((product: Product) => {
                        return { type: 'Product', id: product.id }
                    });
                    tags.push({ type: 'UsersProduct', id: user.id });
                    return tags;
                },
                query: () => {
                    return {
                        url: '/products',
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Context-Type': 'application/json'
                        }
                    };
                },
            }),
        }
    }
})

export const { useFetchProductsQuery, useAddProductMutation } = productsApi;
export { productsApi };