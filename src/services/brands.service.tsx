import { adminApi } from "./baseApi.service";
import { BrandFormType, BrandType } from "../types/brands.type";

const brandApi = adminApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchBrandsList: builder.query<BrandType[], void>({
            query: () => "/brands",
            providesTags: ["Brands"],
        }),
        fetchBrandSelected: builder.query<BrandType, string | undefined>({
            query: (brandId) => `/brand/${brandId}`,
            providesTags: ["Brands"],
        }),
        checkProductsBrand: builder.query<{ existed: boolean }, string>({
            query: (brandId) => `/brand/check-products/${brandId}`,
        }),
        createBrand: builder.mutation<BrandType, BrandFormType>({
            query: (body) => ({
                url: `brand/create-brand`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Brands", "Products"],
        }),
        updateBrand: builder.mutation<BrandType, { brandId?: string; formData: BrandFormType }>({
            query: (body) => ({
                url: `brand/update-brand/${body.brandId}`,
                method: "PUT",
                body: body.formData,
            }),
            invalidatesTags: ["Brands", "Products"],
        }),
        deleteBrand: builder.mutation<BrandType, string>({
            query: (brandId) => ({
                url: `brand/delete-brand/${brandId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Brands", "Products"],
        }),
    }),
});

export default brandApi;
