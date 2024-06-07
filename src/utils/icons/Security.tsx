import { forwardRef, ReactElement } from "react";
import { Icon, IconWeight } from "@phosphor-icons/react/";
import { SSRBase } from "@phosphor-icons/react/dist/ssr";

const weights = new Map<IconWeight, ReactElement>([
  [
    "regular",
    <path
      key="security_icon"
      d="M 130.902344 0 L 0 46.539062 L 0 116.359375 C -0.273438 181.078125 53.164062 238.082031 130.902344 256 C 208.636719 238.082031 262.074219 181.078125 261.800781 116.359375 L 261.800781 46.539062 Z M 130.902344 127.878906 L 232.726562 127.878906 C 226.492188 175.3125 186.953125 215.738281 130.902344 231.988281 L 130.902344 128 L 29.097656 128 L 29.097656 61.679688 L 130.921875 25.496094 Z M 130.902344 127.878906 "
      stroke="none"
      fillRule="nonzero"
      fill="rgb(57.647059%,62.745098%,76.470588%)"
      fillOpacity="1"
    />,
  ],
]);

const Security: Icon = forwardRef((props, ref) => (
  <SSRBase ref={ref} {...props} weights={weights} />
));

Security.displayName = "Security";

export default Security;
