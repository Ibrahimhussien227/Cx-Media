import { createApi } from "@reduxjs/toolkit/query/react";
import { genControlledBaseQuery } from "../genControlledBaseQuery";

// initialize an empty api service that we'll inject endpoints into later as needed
export const sellerApi = createApi({
  reducerPath: "sellerApi",
  baseQuery: genControlledBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SELLER_SERVICE_URL}`,
  }),
  tagTypes: ["list", "details", "stats"],
  endpoints: () => ({}),
});
