import { adminApi } from "./baseApi.service";
import { ProductFormType, ProductType, ProductVariantFormType, ProductVariantType } from "../types/products.type";

const productApi = adminApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchProductsList: builder.query<ProductType[], void>({
            query: () => "/products",
            providesTags: ["Products"],
        }),
        fetchProductsSelected: builder.query<ProductType, string | undefined>({
            query: (productId) => `/product/${productId}`,
            providesTags: ["Products"],
        }),
        updateProduct: builder.mutation<ProductType, { productId?: string; formData: ProductFormType }>({
            query: (body) => ({
                url: `product/update-product/${body.productId}`,
                method: "PUT",
                body: body.formData,
            }),
            invalidatesTags: ["Products"],
        }),
        createProduct: builder.mutation<ProductType, ProductFormType>({
            query: (body) => ({
                url: "product/create-product",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: builder.mutation<ProductType, string>({
            query: (productId) => ({
                url: `product/delete-product/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),

        // variants
        fetchProductVariantsList: builder.query<ProductVariantType[], void>({
            query: () => "product-variants",
            providesTags: ["ProductVariants"],
        }),
        fetchProductVariantSelected: builder.query<ProductVariantType, string | undefined>({
            query: (productVariantId) => `product-variant/${productVariantId}`,
            providesTags: ["ProductVariants"],
        }),
        updateProductVariant: builder.mutation<ProductVariantType, { productVariantId?: string; formData: ProductVariantFormType }>({
            query: (body) => ({
                url: `product-variant/update-variant/${body.productVariantId}`,
                method: "PUT",
                body: body.formData,
            }),
            invalidatesTags: ["ProductVariants"],
        }),
        createProductVariant: builder.mutation<ProductVariantType, ProductVariantFormType>({
            query: (body) => ({
                url: "product-variant/create-variant",
                method: "POST",
                body,
            }),
            invalidatesTags: ["ProductVariants"],
        }),
        deleteProductVariant: builder.mutation<ProductVariantType, string>({
            query: (productVariantId) => ({
                url: `product-variant/delete-variant/${productVariantId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ProductVariants"],
        }),
    }),
});

export default productApi;
