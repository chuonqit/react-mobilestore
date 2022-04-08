import { OrderFormType, OrderType } from "../types/orders.type";
import { ProductType } from "../types/products.type";
import { adminApi } from "./baseApi.service";

const orderApi = adminApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchOrdersList: builder.query<OrderType[], void>({
            query: () => "/orders",
            providesTags: ["Orders"],
        }),
        fetchOrderSelected: builder.query<OrderType, string | undefined>({
            query: (orderId) => `/order/${orderId}`,
            providesTags: ["Orders"],
        }),
        searchProductsListOrder: builder.query<ProductType[], string>({
            query: (keyword) => ({
                url: `/order/search-products-list`,
                method: "GET",
                params: { keyword: keyword },
            }),
        }),
        updateOrderStatus: builder.mutation<OrderType, { orderId: string; status: string }>({
            query: (body) => ({
                url: `/order/update-status/${body.orderId}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Orders"],
        }),
        updateOrder: builder.mutation<OrderType, { orderId?: string; formData: OrderFormType }>({
            query: (body) => ({
                url: `/order/update-order/${body.orderId}`,
                method: "PUT",
                body: body.formData,
            }),
            invalidatesTags: ["Orders"],
        }),
        deleteOrder: builder.mutation<OrderType, string>({
            query: (orderId) => ({
                url: `/order/delete-order/${orderId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Orders"],
        }),
        createOrder: builder.mutation<OrderType, OrderFormType>({
            query: (body) => ({
                url: `/order/create-order`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Orders"],
        }),
    }),
});

export default orderApi;
