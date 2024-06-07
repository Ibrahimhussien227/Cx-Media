import createIntlMiddleware from "next-intl/middleware";
import { NextFetchEvent, NextRequest } from "next/server";

import { defaultLocale, locales } from "@/constants";
import { CustomMiddleware } from "../types";

export const withIntl = (next: CustomMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const intlMiddleware = createIntlMiddleware({
      locales,
      defaultLocale,
      localePrefix: "as-needed",
    });

    const response = intlMiddleware(request);
    return next(request, event, response);
  };
};
