import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../types/IUser";
import { fetchUser, login, register } from "../services/userService";
import { AxiosError } from "axios";

interface userState {
    user: IUser | null,
    authenticated: boolean
}

const initialState: userState = {
    user: null,
    authenticated: false
}

export const userRegisterThunk = createAsyncThunk(
    '/register',
    async (userData: Partial<IUser>, { rejectWithValue }) => {
        try {
            const response = await register(userData);
            return response;
        } catch (error) {
            const errMsg = error instanceof AxiosError ? error.response?.data?.message : "Registration failed";
            return rejectWithValue(errMsg)
        }
    }
)

export const userLoginThunk = createAsyncThunk(
    '/login',
    async (userData: Partial<IUser>, { rejectWithValue }) => {
        try {
            const response = await login(userData);
            return response;
        } catch (error) {
            console.log(error)
            const errMsg = error instanceof AxiosError ? error.response?.data?.message : "Login failed";
            return rejectWithValue(errMsg)
        }
    }
)

export const userFetchUserThunk = createAsyncThunk(
    '/fetch-user',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchUser();
            return response;
        } catch (error) {
            console.log(error)
            const errMsg = error instanceof AxiosError ? error.response?.data?.message : "Login failed";
            return rejectWithValue(errMsg)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        cleanData: (state) => {
            state.user = null;
            state.authenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegisterThunk.fulfilled, (state, action) => {
                state.authenticated = true;
                state.user = action?.payload?.user;
            })
            .addCase(userLoginThunk.fulfilled, (state, action) => {
                state.authenticated = true;
                state.user = action?.payload?.user;
            })
            .addCase(userFetchUserThunk.fulfilled, (state, action) => {
                state.authenticated = true;
                state.user = action?.payload?.data?.user;
            })
    }
})

export const { cleanData } = userSlice.actions;
export default userSlice.reducer;