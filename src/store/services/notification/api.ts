
import { createApi } from '@reduxjs/toolkit/query/react';
import { genControlledBaseQuery } from '../genControlledBaseQuery';

// initialize an empty api service that we'll inject endpoints into later as needed
export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: genControlledBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE,
  }), 
  tagTypes: ["Notification"],
  endpoints: (builder) => ({
    getNotifications: builder.query<{data: INotification[]}, void>({
      query: ()=> 'notifications',
      keepUnusedDataFor: 600,
      providesTags: [{type: 'Notification', id: 'list'}],
    })
  }),
});


export const {useGetNotificationsQuery} = notificationApi