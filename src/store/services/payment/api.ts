
import { createApi } from '@reduxjs/toolkit/query/react';
import { genControlledBaseQuery } from '../genControlledBaseQuery';

// initialize an empty api service that we'll inject endpoints into later as needed

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: genControlledBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_PAYMENT_SERVICE,
  }),  
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    createTelrSession: builder.mutation<{data: {order: {ref:string; url: string}}},ITelrSessionParams>({
      query: (sessionParams)=> ({
        url: 'telr/create-session',
        method: 'POST',
        body: sessionParams
      })
    }),
    checkPaymentStatus: builder.mutation<{data: {order: IPaymentOrder}}, string>({
      query: (orderRef)=> ({
        url: 'telr/check-payment-status',
        method: 'POST',
        body: {orderRef}
      })
    }),
    getUserPaymentHistory: builder.query<IListQueryResp<IPaymentTransaction>, void>({
      query: () => ({
        url: 'telr/get-user-payments',
        method: 'POST',
        body: { sessionTypes: ["kyc-payment", "campaign-payment", "campaign-extend"] }
      }),
      keepUnusedDataFor: 600,
      providesTags: [{ type: 'Payment', id: 'List' }],
    }),  
  }),
});


export const {
  useCreateTelrSessionMutation,
  useCheckPaymentStatusMutation,
  useGetUserPaymentHistoryQuery 
} = paymentApi
