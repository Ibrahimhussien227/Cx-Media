
import { createApi } from '@reduxjs/toolkit/query/react';
import { genControlledBaseQuery } from '../genControlledBaseQuery';

// initialize an empty api service that we'll inject endpoints into later as needed

export const KYCApi = createApi({
  reducerPath: 'KYCApi',
  baseQuery: genControlledBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_KYC_SERVICE_URL,
  }),  
  tagTypes: ["KYC"],
  endpoints: (builder) => ({
    getShuftiProToken: builder.query<{result: {verification_url: string}}, void>({
      query: ()=> ({
        url: `user-kyc-info/get-iframe`,
        method: "GET"
      }),
      keepUnusedDataFor: 600,
      providesTags: [{type: 'KYC', id: 'shufti_token'}],
      
    }),
    getKYCInfo: builder.query<{result: IUserKYCInfo}, void>({
      query: ()=> 'user-kyc-info/get-user-kyc-info',
      keepUnusedDataFor: 600,
      providesTags: [{type: 'KYC', id: 'info'}],
      
    })
  }),
});


export const {
  useLazyGetShuftiProTokenQuery,
  useGetKYCInfoQuery
} = KYCApi