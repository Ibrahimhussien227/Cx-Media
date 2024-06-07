import { ChartLineUp, Share } from "@/utils/icons";
import Image from "next/image";

const DetailsCard = () => {
  return (
    <>
      <div className="flex w-full min-h-[270px] lg:min-h-[180px] relative overflow-hidden">
        <Image
          src="/images/property1.jpg"
          alt="property1"
          className="absolute w-full h-full"
          width={200}
          height={200}
        />
        {/* <p className="absolute text-[11px] text-white px-[10px] bg-default font-bold bottom-[10px] left-[10px] border border-opacity-20 border-[#ffffff] rounded-sm">
          EXITED
        </p> */}
        <div className="bg-[#2C3A5C] z-40 h-[20px] py-0.5 px-2 border absolute bottom-[10px] left-[10px] bg-opacity-[75%]">
          <p className="text-white font-bold text-[11px]">EXITED</p>
        </div>
      </div>
      <div className="border rounded-full flex flex-row gap-1 px-1 py-1 w-full bg-white mt-2 items-center">
        <ChartLineUp className="text-active ml-1" size={14} />
        <p className="text-secondary text-[10px] font-bold">
          SHORT TERM RESIDENTIAL RENTAL
        </p>
      </div>
      <h1 className="text-[22px] font-MinionPro mb-[10px] pl-2">
        3 Bed Villa in Fairways West.
      </h1>
      <div className="flex justify-between gap-2 bg-[#F5FFFB] px-2 py-[7.5px] mb-2 rounded-sm text-[10px] font-bold">
        <p>FUNDING CLOSES ON</p>
        <p className=" tracking-[0px]">23 October, 2023</p>
      </div>
      <div className="px-[10px] py-[7.5px] flex justify-between border bg-white rounded-sm">
        <p className="text-[9px] font-bold text-active">
          VIEW PROPERTY DETAILS
        </p>
        <Share size={14} className="text-active" />
      </div>
    </>
  );
};

export default DetailsCard;
