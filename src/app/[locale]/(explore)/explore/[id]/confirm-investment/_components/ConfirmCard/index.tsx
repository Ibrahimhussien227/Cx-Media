import Link from "next/link";

import CustomButton from "@/components/CustomButton";

const confirmCard = () => {
  return (
    <div className="flex flex-col gap-3 items-center w-[400px] px-5 py-7">
      <p className="text-[26px]">Success!</p>
      <div className="h-[2px] w-8 my-2 bg-[#FF6C02]" />
      <div className="my-2 text-[15px] text-secondary tracking-[0px] font-[380] text-center">
        Your transaction was completed successfully. You can view more details
        and manage this investment from your portfolio.
      </div>
      <div className="w-full flex flex-col gap-2">
        <Link
          href="/transfers"
          className="bg-[#FF6C02] w-full py-2 px-2 text-white text-[10px] flex font-bold tracking-[1.5px] justify-center items-center rounded-[2px]"
        >
          DONE
        </Link>
        <CustomButton className="transition-all delay-100 w-full py-2 bg-[#2C3A5C] text-[white] text-[10px] tracking-[1.5px] px-2 flex font-bold justify-center items-center rounded-[2px]">
          VIEW PORTFOLIO
        </CustomButton>
      </div>
    </div>
  );
};

export default confirmCard;
