import { BrandType } from "../types/brands.type";
import { CategoryType } from "../types/categories.type";
import { OrderFormType, OrderType } from "../types/orders.type";
import { ProductType, ProductVariantType } from "../types/products.type";
import { SliderType } from "../types/sliders.type";
import { clientApi } from "./baseApi.service";

const storeApi = clientApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchCategoriesList: builder.query<CategoryType[], void>({
            query: () => "/categories",
        }),
        filterProductsCategory: builder.mutation<ProductType[], { categoryId?: string; brands?: string; prices?: string; storages?: string }>({
            query: ({ categoryId, brands, prices, storages }) => ({
                url: `/products/filter-products-category/${categoryId}`,
                method: "GET",
                params: { brands, prices, storages },
            }),
        }),
        orderByCustomer: builder.mutation<OrderType, OrderFormType>({
            query: (body) => ({
                url: `/order/order-by-customer`,
                method: "POST",
                body,
            }),
        }),
        searchProduct: builder.query<ProductType[], string | null>({
            query: (keyword) => ({
                url: `/product/search-product`,
                method: "POST",
                body: { keyword },
            }),
        }),
        fetchCategoryProductSelected: builder.query<
            { category: CategoryType; products: ProductType[]; brands: BrandType[]; storages: ProductVariantType[] },
            string | undefined
        >({
            query: (categorySlug) => `/category/get-category-products/${categorySlug}`,
        }),
        fetchHomeDataList: builder.query<
            { productFeatured: ProductType[]; bestSellerData: { [x: string]: ProductType[] }; categories: CategoryType[]; sliders: SliderType[] },
            void
        >({
            query: () => "products/get-home-data",
        }),
        fetchProductsSelected: builder.query<ProductType, string | undefined>({
            query: (productSlug) => `/product/get-product-detail/${productSlug}`,
        }),
        fetchProductsRelated: builder.query<ProductType[], string | undefined>({
            query: (productSlug) => `/products/get-product-related/${productSlug}`,
        }),
    }),
});

export default storeApi;
