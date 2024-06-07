import { AUTH_URL } from "@/constants";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const RoundedButton = ({
  text,
  bgColor,
  arrowColor,
  arrowHeadColor,
  rotate,
}: {
  text: string;
  bgColor: string;
  arrowColor: string;
  arrowHeadColor: string;
  rotate?: string;
}) => {
  return (
    <Link
      href={AUTH_URL}
      className="text-[#FF6C02] text-[12px] font-bold tracking-[2px] flex items-center mt-7 group"
    >
      {text}
      <div
        className={`border-[1px] w-[70px] h-[70px] rounded-[69px] ml-[20px] hover:bg-[wite] group relative ${bgColor} ${rotate}`}
      >
        <div
          className={`h-[1px] w-[0px] absolute left-[33px] top-[35px] transition-all duration-300 group-hover:w-[100px] ${arrowColor}`}
        />
        <div className="absolute flex w-full left-[28px] top-[28px] transition-all delay-100 duration-300 group-hover:ml-[95px]">
          <CaretRight size={15} color={arrowHeadColor} />
        </div>
      </div>
    </Link>
  );
};

export default RoundedButton;
