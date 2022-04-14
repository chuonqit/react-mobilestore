import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../types/products.type";
import productApi from "../../services/products.service";

type ProductState = {
    products: ProductType[];
};

const initialState: ProductState = {
    products: [],
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(productApi.endpoints.fetchProductsList.matchFulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});

export default productsSlice;
