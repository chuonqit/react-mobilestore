import { adminApi } from "./baseApi.service";
import { CategoryFormType, CategoryType } from "../types/categories.type";

const categoryApi = adminApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchCategoriesList: builder.query<CategoryType[], void>({
            query: () => "/categories",
            providesTags: ["Categories"],
        }),
        fetchCategorySelected: builder.query<CategoryType, string | undefined>({
            query: (categoryId) => `/category/${categoryId}`,
            providesTags: ["Categories"],
        }),
        checkProductsCategory: builder.query<{ existed: boolean }, string>({
            query: (categoryId) => `/category/check-products/${categoryId}`,
        }),
        createCategory: builder.mutation<CategoryType, CategoryFormType>({
            query: (body) => ({
                url: `category/create-category`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Categories", "Products"],
        }),
        updateCategory: builder.mutation<CategoryType, { categoryId?: string; formData: CategoryFormType }>({
            query: (body) => ({
                url: `category/update-category/${body.categoryId}`,
                method: "PUT",
                body: body.formData,
            }),
            invalidatesTags: ["Categories", "Products"],
        }),
        deleteCategory: builder.mutation<CategoryType, string>({
            query: (categoryId) => ({
                url: `category/delete-category/${categoryId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Categories", "Products"],
        }),
    }),
});

export default categoryApi;
