export type SliderType = {
    _id: string;
    title: string;
    url: string;
    image: string;
};

export type SliderFormType = {
    title: string;
    url: string;
    image: {
        url: string;
        base64: string;
    };
};
