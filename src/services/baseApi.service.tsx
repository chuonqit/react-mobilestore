import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery, baseQueryWithReauth } from "./configApi.service";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Categories", "Products", "ProductVariants", "Brands", "Configurations", "Orders", "Sliders"],
    endpoints: () => ({}),
});

export const clientApi = createApi({
    reducerPath: "clientApi",
    baseQuery: baseQuery,
    endpoints: () => ({}),
});
