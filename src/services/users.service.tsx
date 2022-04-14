import { adminApi } from "./baseApi.service";
import { UserExcelFormType, UserFormType, UserType } from "../types/users.type";

const userApi = adminApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchUsersList: builder.query<UserType[], void>({
            query: () => "/users",
            providesTags: ["Users"],
        }),
        getUserExcel: builder.mutation<UserType, any>({
            query: (excelFile) => ({
                url: "/user/get-user-excel",
                method: "POST",
                body: excelFile,
            }),
        }),
        createUser: builder.mutation<UserType, UserFormType>({
            query: (body) => ({
                url: `user/create-user`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Users"],
        }),
        updateUser: builder.mutation<UserType, { userId?: string; formData: UserFormType }>({
            query: (body) => ({
                url: `user/update-user/${body.userId}`,
                method: "PUT",
                body: body.formData,
            }),
            invalidatesTags: ["Users"],
        }),
        importUserExcel: builder.mutation<{ ok: boolean }, UserExcelFormType[]>({
            query: (users) => ({
                url: "/user/import-user-excel",
                method: "POST",
                body: { users: users },
            }),
            invalidatesTags: ["Users"],
        }),
        deleteUser: builder.mutation<UserType, string>({
            query: (userId) => ({
                url: `user/delete-user/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export default userApi;
