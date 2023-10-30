import type { ApiContext } from "types";
import { fetcher } from "utils";

export type PurchaseParams = {
    productId: number
}

const purchase = async(
    context: ApiContext,
    params: PurchaseParams,
): Promise<{ message: string}> => {
    return await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/purchases`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
}

export default purchase