import { createApi } from "@reduxjs/toolkit/query/react";
import { genControlledBaseQuery } from "../genControlledBaseQuery";

// initialize an empty api service that we'll inject endpoints into later as needed
export const configurationApi = createApi({
  reducerPath: "configurationApi",
  baseQuery: genControlledBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_CONFIG_SERVICE_URL}`,
  }),
  tagTypes: [""],
  endpoints: () => ({}),
});
