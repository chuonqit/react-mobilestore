import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { NotificationType } from "../types/notifications.type";
import { baseQuery, baseQueryWithReauth } from "./configApi.service";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Categories", "Products", "ProductVariants", "Brands", "Configurations", "Orders", "Sliders", "Users"],
    endpoints: (builder) => ({
        fetchNotification: builder.mutation<NotificationType[], void>({
            query: () => "/notifications",
            invalidatesTags: ["Orders"],
        }),
    }),
});

export const clientApi = createApi({
    reducerPath: "clientApi",
    baseQuery: baseQuery,
    endpoints: () => ({}),
});
