import Cookies from 'js-cookie';
import { createApi } from '@reduxjs/toolkit/query/react';
import { genControlledBaseQuery } from '../genControlledBaseQuery';

// initialize an empty api service that we'll inject endpoints into later as needed
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: genControlledBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL
  }),
  endpoints: (builder) => ({
  
    logout: builder.mutation<{data: boolean}, void>({
      query: ()=> ({
        url: '/auth/logout',
        method: "POST",
      }),
      async onQueryStarted(_args, {queryFulfilled}){
        const {data} = await queryFulfilled;
        if (data?.data){
          Cookies.remove('accessToken');
          Cookies.remove('tokenExpiration');
          window.location.replace(process.env.NEXT_PUBLIC_AUTH_PLATFORM_URL as string)
        }
      }
    }),
  }),
  
});


export const {useLogoutMutation} = authApi