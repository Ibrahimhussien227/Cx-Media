import { configurationApi } from "../api";
import { IGetPaymentResponse } from "./type";

export const paymentApi = configurationApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentManager: builder.query<IGetPaymentResponse, void>({
      query: () => ({
        url: "/paymentManager",
        method: "GET",
      }),
      keepUnusedDataFor: 120,
    }),
  }),
});

export const { useGetPaymentManagerQuery } = paymentApi;
