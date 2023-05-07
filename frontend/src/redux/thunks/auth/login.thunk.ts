import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../../services/auth.service";
import { ILogin } from "../../../interfaces/auth/auth.interface";

export const login = createAsyncThunk(
    "auth/login",
    async (payload: ILogin, thunkAPI) => {
        try {
            const res = await authService.login(payload);
            return res.data;
        } catch (err: any) {
            if (err.name === "AxiosError" && err.response.status === 404) {
                return thunkAPI.rejectWithValue(err.response.data);
            }
            throw err;
        }
    }
);
