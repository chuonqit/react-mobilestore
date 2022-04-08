import { adminApi } from "./baseApi.service";
import { LoginResponse, PayloadLogin } from "../types/users.type";

const authApi = adminApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, PayloadLogin>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),
    }),
});

export default authApi;
