import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "../types";

export const withToken = (next: CustomMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    try {
      const url = request.nextUrl;

      const token = url.searchParams.get("token");
      const tokenExpiration = url.searchParams.get("tokenExpiration");
      const valid = request.cookies.get("accessToken");

      const response = NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_INVESTOR_URL}`
      );

      if (token && tokenExpiration) {
        // Check if the token is already present in cookies to avoid an infinite loop

        // Set the cookie
        response.cookies.set("accessToken", token, {
          expires: new Date(tokenExpiration),
        });

        response.cookies.set("tokenExpiration", tokenExpiration, {
          expires: new Date(tokenExpiration),
        });

        // Remove token-related query parameters
        url.searchParams.delete("token");
        url.searchParams.delete("tokenExpiration");

        return response; // Return the NextResponse object directly
      } else if (valid || url.href.includes('sub-pages')) {
        // Token is valid || a subpage is being accessed, continue to the next handler
        return next(request, event, response);
      } else {
        // No token, redirect to login
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_AUTH_URL}`); // Return the NextResponse object directly
      }
    } catch (error) {
      // Handle the error appropriately
      return NextResponse.error();
    }
  };
};
