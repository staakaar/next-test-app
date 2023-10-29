import useSWR from "swr";
import type { ApiContext, Product, UseProduct } from "types/data";

export type UseProductProps = {
    id: number
    initial?: Product
}

const useProduct = (
    context: ApiContext,
    { id, initial }: UseProductProps,
): UseProduct => {
    const { data, error } = useSWR<Product>(
        `${context.apiRootUrl}/products/${id}`
    )

    return {
        product: data ?? initial,
        isLoading: !error && !data,
        isError: error,
    }
}

export default useProduct