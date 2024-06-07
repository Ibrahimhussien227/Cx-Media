import { adminApi } from "../api";
import { IGetCampaignsResponse } from "./type";

export const getListCampaigns = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCampaign: builder.query<
      IGetCampaignsResponse,
      {
        params: {
          page?: string;
        };
      }
    >({
      query: ({ params }) => ({
        url: "/list",
        method: "GET",
        params,
      }),
      providesTags: [{ type: "CampaignList" }],
    }),
  }),
});

export const { useGetAllCampaignQuery } = getListCampaigns;
