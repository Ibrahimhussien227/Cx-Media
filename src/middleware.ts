// middleware.ts

import { withIntl } from "./middleware/i18n/middleware";
import { stackMiddlewares } from "./middleware/stackMiddlewares";
import { withToken } from "./middleware/token/middleware";

const middlewares = [withToken, withIntl];
export default stackMiddlewares(middlewares);

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
