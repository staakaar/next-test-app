import { createAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import useSWR from "swr";
import { ApiContext } from "types";
import getAllProduct from "../../../services/products/get-all-product"
const defaultProduct = {}

export type Product = {
    products: typeof defaultProduct[];
    status: "loading" | "pending" | "succeeded" | "failed";
    error: undefined | string;
};

/** 初期状態 */
const initialState: Product = {
    products: [],
    status: "loading",
    error: undefined,
};

/** API */
export const fetchProduct = createAsyncThunk(
    "products/",
    async (action, thunkAPI) => {
        const context: ApiContext = {
            apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
        }

        const { data, isValidating, error } = useSWR(context, getAllProduct, { revalidateOnFocus: true, revalidateOnReconnect: true });
        if (error) return error;
        if (isValidating) return;
        return data;
    }
)

/** productListは一覧取得APIでgetStaticPropsでビルド時に取得している それ以降のProductの管理は基本Storeを利用する */
export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action) => {},
        initializeProduct: (state, action) => {},
        resetProduct: (state, action) => {},
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.products = action.payload;
            state.status = 'succeeded';
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.error = action.error.message;
            console.log("could not find product")
        });
    }
});



export default ProductSlice.reducer
export const { addProduct, initializeProduct, resetProduct } = ProductSlice.actions