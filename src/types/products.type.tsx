import { UploadFile } from "antd/lib/upload/interface";
import { BrandType } from "./brands.type";
import { CategoryType } from "./categories.type";
import { ConfigurationType } from "./configurations.type";

export type ProductState = {
    isFetching: boolean;
    productList: ProductType[];
    productEdit: ProductType | null;
    errorMessage: string | undefined;
};

export type ProductImageType = {
    uid: string;
    type: string;
    name: string;
    url: string;
};

export type ProductType = {
    _id: string;
    name: string;
    sku: string;
    nameAscii: string;
    images: ProductImageType[];
    configurations: {
        configuration: ConfigurationType;
        specName: string;
    }[];
    price: number;
    cost: number;
    variants: {
        storage: ProductVariantType;
        price: number;
        cost: number;
        colors: {
            color: ProductVariantType;
            stock: number;
        }[];
    }[];
    description: string;
    purchaseCount: number;
    isFeatured: boolean;
    category: CategoryType;
    brand: BrandType;
};

export type ProductUploadType = UploadFile<{ base64: string }>;

export type ProductFormType = {
    name: string;
    sku: string;
    price: number;
    cost: number;
    images: ProductUploadType[];
    configurations: {
        name: string;
        specName: string;
    }[];
    variants: {
        storage: string;
        price: number;
        cost: number;
        colors: {
            color: string;
            stock: number;
        };
    }[];
    description: string;
    isFeatured: boolean;
};

export type ProductVariantType = {
    _id: string;
    name: string;
    type: "color" | "storage";
    nameAscii: string;
};

export type ProductVariantFormType = {
    name: string;
    type: "color" | "storage";
    nameAscii: string;
};
