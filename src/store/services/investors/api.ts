import { createApi } from "@reduxjs/toolkit/query/react";
import { genControlledBaseQuery } from "../genControlledBaseQuery";

// initialize an empty api service that we'll inject endpoints into later as needed
export const investorApi = createApi({
  reducerPath: "investorApi",
  baseQuery: genControlledBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_INVESTOR_SERVICE_URL}`,
  }),
  tagTypes: ["InvestorDetails", "AppList", "stats"],
  endpoints: () => ({}),
});
