import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { campaignApi } from "./services/campaigns/api";
import { adminApi } from "./services/campaignAdmin/api";
import { investorApi } from "./services/investors/api";
import { mapBoxApi } from "./services/mapbox/api";
import { configurationApi } from "./services/configuration/api";
import { userApi } from "./services/admin/api";
import { sellerApi } from "./services/sellers/api";

export const rootReducers = combineReducers({
  [adminApi.reducerPath]: adminApi.reducer,
  [campaignApi.reducerPath]: campaignApi.reducer,
  [investorApi.reducerPath]: investorApi.reducer,
  [sellerApi.reducerPath]: sellerApi.reducer,
  [mapBoxApi.reducerPath]: mapBoxApi.reducer,
  [configurationApi.reducerPath]: configurationApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducers,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        adminApi.middleware,
        campaignApi.middleware,
        mapBoxApi.middleware,
        configurationApi.middleware,
        userApi.middleware,
        investorApi.middleware,
        sellerApi.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
