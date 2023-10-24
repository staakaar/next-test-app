import useSWR from "swr";
import type { ApiContext, Product, UseProduct } from 'types/data';
import { fetcher } from "utils"

export type UseAllProductProps = {
    category?: string
    limit?: number
    page?: number
}

const getAllProduct = async (
    context: ApiContext,
    { category, limit, page }: UseAllProductProps = {}
) => {
    // const path = `${context.apiRootUrl}/products`

    // const params = new URLSearchParams()

    // category && params.append('category', category)
    // limit && params.append('limit', `${limit}`)
    // page && params.append('page', `${page}`)

    // const query = params.toString()

    // const { data, error } = useSWR<Product[]>(query.length > 0 ? `${path}?${query}` : path, fetcher)

    // return {
    //     product: data ?? [],
    //     isLoading: !error && !data,
    //     isError: error
    // }
    return await fetcher(
        `${context.apiRootUrl}/products`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Context-Type': 'application/json'
            },
        },
    )
}

export default getAllProduct