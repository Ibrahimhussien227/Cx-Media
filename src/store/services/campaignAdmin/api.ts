import { createApi } from "@reduxjs/toolkit/query/react";
import { genControlledBaseQuery } from "../genControlledBaseQuery";

// initialize an empty api service that we'll inject endpoints into later as needed
export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: genControlledBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_CAMPAIGN_SERVICE_URL}/admin`,
  }),
  tagTypes: ["CampaignList"],
  endpoints: () => ({}),
});
