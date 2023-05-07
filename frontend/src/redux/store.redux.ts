import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";

// combine các reducer con thành 1 root reducer
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>; // đảm bảo type của RootState được cập nhật
//chính xác khi type của store thay đổi
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// đảm bảo type của AppDispatch được cập nhật
//chính xác khi type của store thay đổi
