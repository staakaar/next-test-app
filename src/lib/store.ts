import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "pages/api/product/product";

export const store = () => configureStore({
        reducer: {
            [productsApi.reducerPath]: productsApi.reducer
        },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(productsApi.middleware);
        }
    })

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']