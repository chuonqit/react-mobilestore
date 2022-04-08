import { ProductType } from "./products.type";

export type OrderStatusType = "pending" | "confirm" | "shipping" | "done" | "close";

export type OrderType = {
    _id: string;
    code: string;
    products: OrderProductType[];
    price: number;
    status: OrderStatusType;
    shippingInfo: ShippingInfoType;
};

export type OrderProductType = {
    product: ProductType;
    price: number;
    cost: number;
    color: string;
    storage: string;
    quantity: number;
};

export type ShippingInfoType = {
    address: string;
    email: string;
    fullname: string;
    note: string;
    phoneNumber: string;
};

export type OrderFormType = {
    products: OrderProductType[];
    price: number;
    address: string;
    email: string;
    fullname: string;
    note: string;
    phoneNumber: string;
};
