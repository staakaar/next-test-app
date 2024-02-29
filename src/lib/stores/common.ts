import { createSlice } from "@reduxjs/toolkit";

export type Notification = {
    message: string
};

/** 初期状態 */
const initialState: Notification = {
    message: ''
};

/** productListは一覧取得APIでgetStaticPropsでビルド時に取得している それ以降のProductの管理は基本Storeを利用する */
export const NotificationSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        messageCreated: (state, action) => {},
    },
});

export const { messageCreated } = NotificationSlice.actions