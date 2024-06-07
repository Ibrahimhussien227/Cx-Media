
import { createApi } from '@reduxjs/toolkit/query/react';
import { genControlledBaseQuery } from '../genControlledBaseQuery';




// initialize an empty api service that we'll inject endpoints into later as needed
export const campaignApi = createApi({
  reducerPath: 'campaignApi',
  baseQuery: genControlledBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_CAMPAIGN_SERVICE_URL
  }), 
  tagTypes: ["Campaign"],
  endpoints: (builder) => ({
    getCamapignsConfigs: builder.query<{data: ICampaignConfig[]}, string>({
      query: (configType)=> `config/list?configType=${configType}`,
      keepUnusedDataFor: 600,
      providesTags: (_res, _err, type) => [{ type: 'Campaign', id: `config_${type}` }],
    })
  }),
});


export const { useGetCamapignsConfigsQuery } = campaignApi;