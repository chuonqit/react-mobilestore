import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/users.type";
import authApi from "../../services/auth.service";

const initialState: AuthState = {
    user: null,
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuth: (state) => {
            state.user = null;
            state.accessToken = "";
            state.refreshToken = "";
            state.isAuthenticated = false;
        },
        refreshToken: (state, action) => {
            state.accessToken = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = !!action.payload.accessToken;
        });
    },
});

export const { clearAuth, refreshToken } = authSlice.actions;
export default authSlice;
