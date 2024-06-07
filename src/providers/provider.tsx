"use client";

import ReduxProvider from "./redux.provider";
import "@/i18n/i18n";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default Provider;
