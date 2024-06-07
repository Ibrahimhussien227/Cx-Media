import React from "react";
import TimeLineText from "./TimeLineText";

const TimeLineSection = async () => {
  return (
    <section className="relative flex flex-col w-full bg-gradient-to-b from-white to-[#FFFAF8] p-5">
      <div className="absolute w-[2px] h-3 bg-active left-[-1px] top-5" />

      <div className="flex flex-col w-full">
        <h2 className="text-secondary text-[10px] font-bold tracking-[1.5px] mb-2">
          TIMELINE
        </h2>
        <TimeLineText title="Funding Completion" date="27 December, 2023" />
        {/* <span className="gradient-orange flex w-[3px] h-[44px] relative top-[-7px] ml-[4px]" /> */}

        <TimeLineText title="SPV Formation" date="27 December, 2023" />

        {/* <span className="gradient-orange flex w-[3px] h-[40px] relative top-[-7px] ml-[4px]" /> */}
        <TimeLineText
          title="1st Rent Yield Distribution"
          date="27 December, 2023"
        />
        {/* <span className="gradient-orange flex w-[3px] h-[40px] relative top-[-7px] ml-[4px]" /> */}
      </div>
    </section>
  );
};

export default TimeLineSection;
