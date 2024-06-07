import React from "react";

import HeroSection from "@/components/HeroSection";
import StartingCard from "@/components/StartingCard";

const Seller = () => {
  return (
    <>
      {/* Hero title section */}
      <div className="flex w-full  justify-center bg-[#2C3A5C]">
        <HeroSection
          header="This is a hero section for Investors."
          descreption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              tincidunt, mi sit amet venenatis pellentesque. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Integer tincidunt, mi sit
              amet venenatis pellentesque."
          reverse
        />
      </div>
      {/* Two Cards Section */}
      <div className="flex w-full justify-center">
        <div className="flex w-[80%] items-center my-[140px]">
          <StartingCard
            header="I am a Sole Proprietor."
            descreption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              tincidunt, mi sit amet venenatis pellentesque."
            buttonTitle="APPLY NOW"
          />
          <StartingCard
            header="I represent a Business."
            descreption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              tincidunt, mi sit amet venenatis pellentesque."
            buttonTitle="APPLY NOW"
          />
        </div>
      </div>
    </>
  );
};

export default Seller;
