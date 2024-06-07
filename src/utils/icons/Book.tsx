import { type SVGProps, forwardRef } from "react";

const Book = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="14.002"
        viewBox="0 0 12 14.002"
        ref={ref}
        {...props}
      >
        <g
          id="Group_16009"
          data-name="Group 16009"
          transform="translate(-5.5 -4.25)"
        >
          <path
            id="Path_21"
            data-name="Path 21"
            d="M7.409,4.25h8.182A1.9,1.9,0,0,1,17.5,6.126V17.267a.993.993,0,0,1-1,.984H7.409A1.9,1.9,0,0,1,5.5,16.376V6.126A1.9,1.9,0,0,1,7.409,4.25Zm9,12.925V6.126a.809.809,0,0,0-.818-.8H7.409a.809.809,0,0,0-.818.8V16.376a.809.809,0,0,0,.818.8Z"
            transform="translate(0 0)"
            fill="#fff"
          />
          <path
            id="Path_22"
            data-name="Path 22"
            d="M13.807,8.827H9.789a.539.539,0,0,1,0-1.077h4.019a.539.539,0,0,1,0,1.077Z"
            transform="translate(-0.298 -0.38)"
            fill="#fff"
          />
          <path
            id="Path_23"
            data-name="Path 23"
            d="M6.045,18.167a.542.542,0,0,1-.545-.539A1.9,1.9,0,0,1,7.409,15.75h9.545a.539.539,0,1,1,0,1.077H7.409a.811.811,0,0,0-.818.8A.542.542,0,0,1,6.045,18.167Z"
            transform="translate(0 -1.255)"
            fill="#fff"
          />
        </g>
      </svg>
    );
  },
);
Book.displayName = "Book";

export default Book;
