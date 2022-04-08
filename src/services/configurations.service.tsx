import { adminApi } from "./baseApi.service";
import { ConfigurationFormType, ConfigurationType } from "../types/configurations.type";

const configurationApi = adminApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchConfigurationsList: builder.query<ConfigurationType[], void>({
            query: () => "/configurations",
            providesTags: ["Configurations"],
        }),
        fetchConfigurationSelected: builder.query<ConfigurationType, string | undefined>({
            query: (configurationId) => `/configuration/${configurationId}`,
            providesTags: ["Configurations"],
        }),
        createConfiguration: builder.mutation<ConfigurationType, ConfigurationFormType>({
            query: (body) => ({
                url: `configuration/create-configuration`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Configurations"],
        }),
        updateConfiguration: builder.mutation<ConfigurationType, { configurationId?: string; formData: ConfigurationFormType }>({
            query: (body) => ({
                url: `configuration/update-configuration/${body.configurationId}`,
                method: "PUT",
                body: body.formData,
            }),
            invalidatesTags: ["Configurations"],
        }),
        deleteConfiguration: builder.mutation<ConfigurationType, string>({
            query: (configurationId) => ({
                url: `configuration/delete-configuration/${configurationId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Configurations"],
        }),
    }),
});

export default configurationApi;
