"use client";

import { store } from "@/store/store";
import { Provider } from "react-redux";
import "@/i18n/i18n";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
export default ReduxProvider;
