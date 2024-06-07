
import Cookies from 'js-cookie';

import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';


export const genControlledBaseQuery =(baseQueryArgs: FetchBaseQueryArgs)=>{
  const baseQuery = fetchBaseQuery({
    ...baseQueryArgs,
    prepareHeaders: (headers)=> {
      // set authorization bearer token here
      const accessToken = Cookies.get('accessToken');
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    }
  })
  const controlledBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
    > = async (args, api, extraOptions) => {
      const accessToken = Cookies.get('accessToken');
      if (!accessToken){
        window.location.replace(process.env.NEXT_PUBLIC_AUTH_PLATFORM_URL as string)
      }
      let result = await baseQuery(args, api, extraOptions);
      
      if (result.error && result.error.status === 401) { // start refresh token logic
        // set "result" to the following successful baseQuery call
        // it will be something along these lines

        /* const authBaseQuery = fetchBaseQuery({
            baseUrl: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL
          })
          const refreshResult = await authBaseQuery({
            url: '/auth/refresh-token',
            method: 'POST',
            body: {
              accessToken: accessToken,
              refreshToken: "refreshToken you get upon token generation"
            }
          })
          if (refreshResult.data){
            const {accessToken, tokenExpiration} = refreshResult.data;
            Cookies.set(
              'accessToken',
              accessToken,
              {expires: new Date(tokenExpiration)}
            )
            result = await baseQuery(args, api, extraOptions);
          } else {
            window.location.replace(process.env.NEXT_PUBLIC_AUTH_PLATFORM_URL as string)
          }
        */
      }
      return result
    }

    return controlledBaseQuery;

}