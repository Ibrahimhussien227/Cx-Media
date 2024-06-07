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

export const AUTH_URL = `${process.env.NEXT_PUBLIC_AUTH_URL}`;
