import { forwardRef, ReactElement } from "react";
import { Icon, IconWeight } from "@phosphor-icons/react/";
import { SSRBase } from "@phosphor-icons/react/dist/ssr";

const weights = new Map<IconWeight, ReactElement>([
  [
    "regular",
    <g key="sort_icon">
      <path d="M 106.292969 17.355469 C 110.96875 13.613281 119.171875 11.339844 128 11.339844 C 136.828125 11.339844 145.03125 13.613281 149.707031 17.355469 L 231.628906 82.816406 C 236.5625 86.761719 236.824219 91.734375 232.3125 95.804688 C 227.800781 99.875 219.226562 102.398438 209.921875 102.398438 L 46.078125 102.398438 C 36.773438 102.398438 28.199219 99.875 23.6875 95.804688 C 19.175781 91.734375 19.4375 86.761719 24.371094 82.816406 Z M 106.292969 17.355469 " />
      <path
        d="M 149.707031 238.644531 C 145.03125 242.386719 136.828125 244.660156 128 244.660156 C 119.171875 244.660156 110.96875 242.386719 106.292969 238.644531 L 24.371094 173.183594 C 19.4375 169.238281 19.175781 164.265625 23.6875 160.195312 C 28.199219 156.125 36.773438 153.601562 46.078125 153.601562 L 209.921875 153.601562 C 219.226562 153.601562 227.800781 156.125 232.3125 160.195312 C 236.824219 164.265625 236.5625 169.238281 231.628906 173.183594 Z M 149.707031 238.644531 "
        stroke="none"
        fillRule="nonzero"
        fill="gb(17.254902%,22.745098%,36.078431%)"
        fillOpacity="1"
      />
    </g>,
  ],
]);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const Sort: Icon = forwardRef((props, ref) => (
  <SSRBase ref={ref} {...props} weights={weights} />
));

Sort.displayName = "Sort";

export default Sort;
