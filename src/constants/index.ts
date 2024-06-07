import { Locale } from "@/types/localLanguage";

export const defaultLocale: Locale = "en";

export const locales: Locale[] = ["en", "ar"];

export enum LoginState {
  isLoggedin = "loggedIn",
  isLoggedOut = "loggedOut",
}
export enum PropertyState {
  FUNDED = "funded",
}
