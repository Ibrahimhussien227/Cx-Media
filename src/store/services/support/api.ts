
import { createApi } from '@reduxjs/toolkit/query/react';
import { genControlledBaseQuery } from '../genControlledBaseQuery';

// initialize an empty api service that we'll inject endpoints into later as needed
export const supportApi = createApi({
  reducerPath: 'supportApi',
  baseQuery: genControlledBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SUPPORT_SERVICE_URL
  }),
  tagTypes: ["Support"],
  endpoints: (builder) => ({
  
    supportTicket: builder.mutation<ISupportTicketParams, {subject: string, message: string}>({
      query: (reqObj)=> ({
        url: 'callback/support-ticket',
        method: "POST",
        body: reqObj
      })
    }),
  }),
  
});


export const {useSupportTicketMutation} = supportApi