import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../../services/auth.service";

export const getProfile = createAsyncThunk(
    "auth/getProfile",
    async (_, thunkAPI) => {
        const res = await authService.getProfile({ signal: thunkAPI.signal });
        return res.data;
    }
);
