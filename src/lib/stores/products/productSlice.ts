import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import useSWR from "swr";

const initialState = {
    product: {
        productList: []
    }
}

export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {}
})