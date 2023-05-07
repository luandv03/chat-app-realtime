import { createSlice, AsyncThunk } from "@reduxjs/toolkit";

import { login } from "../../thunks/auth/login.thunk";
import { getProfile } from "../../thunks/auth/getProfile.thunk";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

interface Avatar {
    public_id: string;
    url: string;
}

export interface IUser {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    avatar: Avatar;
    accessToken?: string;
    refreshToken?: string;
}

interface IAuthState {
    user: IUser;
    loading: boolean;
    isLogined: boolean;
    currentRequestId: string; // xu ly abort huy call API , lam mat loading
}

const initialState: IAuthState = {
    user: {
        _id: "",
        email: "",
        firstname: "",
        lastname: "",
        avatar: {
            public_id: "",
            url: "",
        },
    },
    loading: false,
    isLogined: false,
    currentRequestId: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.isLogined = true;
                localStorage.setItem(
                    "isLogined",
                    JSON.stringify(state.isLogined)
                );
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                if (!JSON.parse(localStorage.getItem("isLogined") as string)) {
                    state.isLogined = true;
                    localStorage.setItem(
                        "isLogined",
                        JSON.stringify(state.isLogined)
                    );
                }

                state.user._id = action.payload._id;
                state.user.email = action.payload.email;
                state.user.firstname = action.payload.firstname;
                state.user.lastname = action.payload.lastname;
                state.user.avatar = action.payload.avatar;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLogined = false;
                localStorage.setItem(
                    "isLogined",
                    JSON.stringify(state.isLogined)
                );
            })
            .addMatcher<PendingAction | RejectedAction>(
                (action) => action.type.endsWith("pending"),
                (state, action) => {
                    state.loading = true;
                    state.currentRequestId = action.meta.requestId;
                }
            )
            .addMatcher<RejectedAction | FulfilledAction>(
                (action) =>
                    action.type.endsWith("fulfilled") ||
                    action.type.endsWith("rejected"),
                (state, action) => {
                    if (
                        state.loading &&
                        action.meta.requestId === state.currentRequestId
                    )
                        state.loading = false;
                }
            );
    },
});

const authReducer = authSlice.reducer;
export default authReducer;
