/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";

import { IHeroSection } from "./type";
import RoundedButton from "./RoundedButton";
import Carousel from "../Carousel";

const HeroSection = ({
  header,
  descreption,
  reverse,
  bgColor,
}: IHeroSection) => {
  const property = [
    { filePath: "/images/property1.jpg" },
    { filePath: "/images/property2.jpg" },
    { filePath: "/images/property3.jpg" },
    { filePath: "/images/property4.jpg" },
  ];
  return (
    <section className={`relative flex w-full justify-center ${bgColor}`}>
      {!descreption && (
        <>
          <div className="absolute left-[-120px] top-[40px]">
            <Image src="/images/Group 44.svg" alt="" width={390} height={390} />
          </div>
          <div className="absolute right-[-35px] top-[590px]">
            <Image src="/images/Group 45.svg" alt="" width={390} height={390} />
          </div>
        </>
      )}
      <div
        className={`flex gap-4 w-[80%] ${
          !reverse && "flex-row-reverse"
        } items-center my-16 justify-between`}
      >
        <div className="relative h-[700px] w-[700px]">
          <Carousel slides={property} />
        </div>
        <div className={`flex ${descreption ? "w-[35%]" : "w-[20%]"} flex-col`}>
          <h1
            className={`${
              reverse ? "text-white text-[40px]" : "text-black text-[50px] "
            } leading-[50px] mb-10`}
          >
            {header}
          </h1>
          {descreption && (
            <p
              className={`mb-10 ${
                reverse ? "text-[#D4E4F2]" : "text-secondary"
              } text-[14px]`}
            >
              {descreption}
            </p>
          )}

          <RoundedButton
            text="CALL TO ACTION"
            bgColor={
              reverse ? "group-hover:bg-white" : "group-hover:bg-[#F5FAFF]"
            }
            arrowColor="bg-[#D4E4F2]"
            arrowHeadColor="#D4E4F2"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
