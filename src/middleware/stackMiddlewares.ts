import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { CustomMiddleware, MiddlewareFactory } from "./types";

export function stackMiddlewares(
  functions: MiddlewareFactory[] = [],
  index = 0
): CustomMiddleware {
  const current = functions[index];

  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }

  return (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse<unknown> = new NextResponse()
  ) => {
    return response;
  };
}
