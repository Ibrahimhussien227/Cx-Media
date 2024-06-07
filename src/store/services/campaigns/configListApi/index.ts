import { campaignApi } from "../api";
import { IGetConfigResponse } from "./type";

export const configListApi = campaignApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfigList: builder.query<IGetConfigResponse, { configType: string }>({
      query: (searchParams) => ({
        url: `/config/list`,
        method: "GET",
        params: searchParams,
      }),
    }),
  }),
});

export const { useGetConfigListQuery } = configListApi;
