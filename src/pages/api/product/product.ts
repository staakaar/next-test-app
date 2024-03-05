import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { context } from '../api';
import { Product } from 'types';
import { messageCreated } from 'lib/stores/common';

const productsApi = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({
        baseUrl: context.apiRootUrl,
        prepareHeaders: async (headers, _) => {},
        mode: 'cors',
    }),
    tagTypes: ["Product"],
    endpoints(builder) {
        return {
            removeProduct: builder.mutation({
                query: (product) => {
                    return {
                        url: `/products/${product.id}`,
                        method: 'DELETE',
                    };
                },
            }),
            addProduct: builder.mutation({
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
            fetchProducts: builder.query<Product[], void>({
                query: () => '/products',
                transformResponse: (response: Product[]) => response,
                transformErrorResponse: (response: { status: string | number }, meta, arg) => response.status,
                providesTags: (results) => results
                ? [
                    ...results.map(({ id }) => ({ type: 'Product' as const, id })),
                    { type: 'Product', id: 'LIST' },
                ]
                : [{ type: 'Product', id: 'LIST' }],
                // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                //     dispatch(messageCreated('Fetching product...'))
                //     try {
                //         const { data } = await queryFulfilled
                //         dispatch(messageCreated('product received!'))
                //     } catch (err) {
                //         dispatch(messageCreated('error Fetching product'))
                //     }
                // }
            }),
        }
    }
})

export const { useFetchProductsQuery, useAddProductMutation } = productsApi;
export { productsApi };