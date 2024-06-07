import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./constants";

// Can be imported from a shared config

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as string)) notFound();

  return {
    messages: (await import(`../src/translations/${locale}.json`)).default,
  };
});
