import { type SVGProps, forwardRef } from "react";

const CartUp = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="15"
        viewBox="0 0 13 15"
        ref={ref}
        {...props}
      >
        <path
          id="Path_20312"
          data-name="Path 20312"
          d="M12,5.125h2.138a.514.514,0,0,1,.35.139.541.541,0,0,1,.169.344l.318,3.268h-1.05L13.66,6.2H12V7.8a.543.543,0,0,1-.153.379.512.512,0,0,1-.738,0,.543.543,0,0,1-.153-.379V6.2H6.777V7.8a.543.543,0,0,1-.153.379.512.512,0,0,1-.738,0A.543.543,0,0,1,5.733,7.8V6.2H4.068l-.835,8.571H8.865v1.071H2.656a.511.511,0,0,1-.212-.046.522.522,0,0,1-.175-.13.538.538,0,0,1-.109-.192.549.549,0,0,1-.023-.221l.939-9.643a.541.541,0,0,1,.169-.344.514.514,0,0,1,.35-.139H5.733V4.751A3.26,3.26,0,0,1,8.865,1.375,3.26,3.26,0,0,1,12,4.751v.375Zm-1.044,0V4.751a2.2,2.2,0,0,0-2.088-2.3,2.2,2.2,0,0,0-2.088,2.3v.375h4.175Zm3.285,8.1L13.04,12v3.842a.543.543,0,0,1-.153.379.512.512,0,0,1-.738,0A.543.543,0,0,1,12,15.839V12l-1.2,1.228a.522.522,0,0,1-.169.12.509.509,0,0,1-.4,0,.521.521,0,0,1-.171-.117.536.536,0,0,1-.114-.176.55.55,0,0,1,0-.414.537.537,0,0,1,.117-.174l2.088-2.143a.512.512,0,0,1,.738,0l2.088,2.143a.536.536,0,0,1,.117.174.549.549,0,0,1,0,.414.536.536,0,0,1-.114.176.522.522,0,0,1-.171.117.509.509,0,0,1-.4,0A.522.522,0,0,1,14.237,13.225Z"
          transform="translate(-2.135 -1.375)"
          fill="#fff"
        />
      </svg>
    );
  },
);

CartUp.displayName = "CartUp";

export default CartUp;
