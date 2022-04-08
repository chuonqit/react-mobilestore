import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ProductCartType = {
    productName: string;
    productImage: string;
    productColor: string;
    productStorage: string;
    productPrice: number;
    productCost: number;
    productURL: string;
    product: string;
    quantity: number;
    price: number;
    cost: number;
    color: string;
    storage: string;
};

type CartType = {
    products: ProductCartType[];
    totalPrice: number;
};

type CartFormType = {
    products: ProductCartType;
};

type CartState = {
    carts: CartType;
};

const initialState: CartState = {
    carts: {
        products: [],
        totalPrice: 0,
    },
};

const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartFormType>) => {
            let itemIndex: any = state.carts.products.findIndex(
                (item) =>
                    item.product === action.payload.products.product && item.color === action.payload.products.color && item.storage === action.payload.products.storage
            );
            if (itemIndex! > -1) {
                let productItem = state.carts.products[itemIndex];
                productItem.quantity += action.payload.products.quantity;
                productItem.cost = productItem.quantity * productItem.productCost;
                productItem.price = productItem.quantity * productItem.productPrice;
                state.carts.products[itemIndex] = productItem;
            } else {
                state.carts.products.push({ ...action.payload.products });
            }

            let cartTotal = 0;
            state.carts.products.forEach((item) => {
                if (item.cost > 0) {
                    cartTotal += item.cost;
                } else {
                    cartTotal += item.price;
                }
            });
            state.carts.totalPrice = cartTotal;
        },
        removeCartItem: (state, action: PayloadAction<number>) => {
            state.carts.products = state.carts.products.filter((_, index) => index !== action.payload);

            let cartTotal = 0;
            state.carts.products.forEach((item) => {
                if ((item.cost !== undefined || item.cost === null) && item.cost > 0) {
                    cartTotal += item.cost;
                } else {
                    cartTotal += item.price;
                }
            });
            state.carts.totalPrice = cartTotal;
        },
        changeCartQuantity: (state, action: PayloadAction<{ quantity: number; index: number }>) => {
            state.carts.products = state.carts.products.map((item, index) => {
                if (index === action.payload.index) {
                    item.quantity = action.payload.quantity;
                    item.cost = item.quantity * item.productCost;
                    item.price = item.quantity * item.productPrice;
                }
                return item;
            });

            let cartTotal = 0;
            state.carts.products.forEach((item) => {
                if ((item.cost !== undefined || item.cost === null) && item.cost > 0) {
                    cartTotal += item.cost;
                } else {
                    cartTotal += item.price;
                }
            });
            state.carts.totalPrice = cartTotal;
        },
        clearCart: (state) => {
            state.carts = {
                products: [],
                totalPrice: 0,
            };
        },
    },
});

export const { addToCart, removeCartItem, changeCartQuantity, clearCart } = cartSlice.actions;
export default cartSlice;
