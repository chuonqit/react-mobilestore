export type CategoryType = {
    _id: string;
    name: string;
    nameAscii: string;
    image: string;
};

export type CategoryFormType = {
    name: string;
    nameAscii: string;
    image: {
        url: string;
        base64: string;
    };
};
