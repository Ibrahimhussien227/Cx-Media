import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const mapBoxApi = createApi({
  reducerPath: "mapBoxApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_MAPBOX_SERVICE_URL,
  }),
  endpoints: (builder) => ({
    getMapBox: builder.query<void, string>({
      query: (searchStr) =>
        `/${searchStr}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetMapBoxQuery } = mapBoxApi;
