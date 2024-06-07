import { forwardRef, ReactElement } from "react";
import { Icon, IconWeight } from "@phosphor-icons/react/";
import { SSRBase } from "@phosphor-icons/react/dist/ssr";

const weights = new Map<IconWeight, ReactElement>([
  [
    "regular",
    <path
      key="dashboard_icon"
      d="M 10.806061 5.250076 L 15.472977 5.250076 C 16.454483 5.250473 17.249924 6.046509 17.249924 7.028015 L 17.249924 15.588028 C 17.249924 16.505859 16.505859 17.249924 15.588028 17.249924 L 10.806061 17.249924 M 10.806061 5.250076 L 7.028015 5.250076 C 6.046112 5.250076 5.250076 6.046112 5.250076 7.028015 L 5.250076 15.588028 C 5.250076 16.505859 5.994141 17.249924 6.911972 17.249924 L 10.805069 17.249924 M 10.805069 5.250076 L 10.805069 17.249924 M 17.248932 11.25 L 10.806061 11.25 "
      transform="matrix(19.692308,0,0,19.692308,-93.538462,-93.538462)"
      fill="none"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={1}
      strokeMiterlimit={4}
      stroke="currentColor"
    />,
  ],
]);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const Dashboard: Icon = forwardRef((props, ref) => (
  <SSRBase ref={ref} {...props} weights={weights} />
));

Dashboard.displayName = "Dashboard";

export default Dashboard;
