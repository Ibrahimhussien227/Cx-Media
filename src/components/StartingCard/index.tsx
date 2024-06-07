import React from "react";
import Image from "next/image";

import { ArrowRight } from "@/utils/icons";
import { IStartingCardProps } from "./type";
import Link from "next/link";
import { AUTH_URL } from "@/constants";

const StartingCard = ({
  header,
  descreption,
  buttonTitle,
}: IStartingCardProps) => {
  return (
    <div className="flex w-[50%] flex-col border-[1px] ml-5 p-[30px] bg-[#ffffff] rounded-[2px] relative">
      <div className="bg-active text-[white] w-[12px] h-[2px] absolute -top-[2px]" />
      <h2 className="text-[26px] font-minion mb-3">{header}</h2>
      <p className="text-[#5A6A93] text-[14px] tracking-[0px]">
        {descreption}
        <span className="text-[#FF6C02] text-[14px] tracking-[0px] font-bold">
          Learn More.
        </span>
      </p>
      <div className="my-[50px] justify-center flex">
        <Image
          src="/images/landing.svg"
          width={236}
          height={236}
          alt="left Arrow"
          className=""
        />
      </div>
      <div className="flex justify-between w-full">
        <p className="text-[#5A6A93] text-[12px] tracking-[0px] w-[42%]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt, mi sit amet.
        </p>
        <Link
          href={AUTH_URL}
          className="bg-active text-white font-bold text-[10px] flex w-[30%] px-3 py-1 items-center rounded-sm justify-between"
        >
          <p>{buttonTitle}</p>
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default StartingCard;
