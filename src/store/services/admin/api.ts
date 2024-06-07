import { createApi } from "@reduxjs/toolkit/query/react";
import { genControlledBaseQuery } from "../genControlledBaseQuery";

// initialize an empty api service that we'll inject endpoints into later as needed
export const userApi = createApi({
  reducerPath: "userApi",

  baseQuery: genControlledBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}`,
  }),
  tagTypes: ["Admin"],

  //   tagTypes: ["adminstration", "list"],
  endpoints: () => ({}),
});
