import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import userReducer from "./slices/user/userSlice";
import resizeReducer from "./slices/resizePage/resizeSlice";
import { sellerApi } from "./services/seller/api";
import { campaignApi } from "./services/campaign/api";
import { KYCApi } from "./services/kyc/api";
import { configurationApi } from "./services/configuration/api";
import { notificationApi } from "./services/notification/api";
import { supportApi } from "./services/support/api";
import { paymentApi } from "./services/payment/api";
import { authApi } from "./services/auth/api";

export const rootReducers = combineReducers({
  user: userReducer,
  resize: resizeReducer,
  [sellerApi.reducerPath]: sellerApi.reducer,
  [campaignApi.reducerPath]: campaignApi.reducer,
  [KYCApi.reducerPath]: KYCApi.reducer,
  [configurationApi.reducerPath]: configurationApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [supportApi.reducerPath]: supportApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [authApi.reducerPath]: authApi.reducer
});


export const store = configureStore({
  reducer: rootReducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    campaignApi.middleware,
    sellerApi.middleware,
    KYCApi.middleware,
    configurationApi.middleware,
    notificationApi.middleware,
    supportApi.middleware,
    paymentApi.middleware,
    authApi.middleware
  ),
});


setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

