import { SliderFormType, SliderType } from "../types/sliders.type";
import { adminApi } from "./baseApi.service";

const sliderApi = adminApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchSlidersList: builder.query<SliderType[], void>({
            query: () => "/sliders",
            providesTags: ["Sliders"],
        }),
        fetchSliderSelected: builder.query<SliderType, string | undefined>({
            query: (sliderId) => `/slider/${sliderId}`,
            providesTags: ["Sliders"],
        }),
        createSlider: builder.mutation<SliderType, SliderFormType>({
            query: (body) => ({
                url: `slider/create-slider`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Sliders"],
        }),
        updateSlider: builder.mutation<SliderType, { sliderId?: string; formData: SliderFormType }>({
            query: (body) => ({
                url: `slider/update-slider/${body.sliderId}`,
                method: "PUT",
                body: body.formData,
            }),
            invalidatesTags: ["Sliders"],
        }),
        deleteSlider: builder.mutation<SliderType, string>({
            query: (sliderId) => ({
                url: `slider/delete-slider/${sliderId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Sliders"],
        }),
    }),
});

export default sliderApi;
