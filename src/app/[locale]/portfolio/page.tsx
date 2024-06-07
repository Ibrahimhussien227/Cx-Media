import React from "react";

import CustomSelect from "@/components/CustomSelect";
import { DownloadSimple } from "@/utils/icons";
import { FILTEROPTIONS, FILTERPERIOD, TotalEarningsData } from "./config";
import TableWrapper from "./_components/TableWrapper";
import TotalEarningProgressBar from "@/components/TotalEarningProgressBar";

const Profile = ({ searchParams }: ISearchParamsProps) => {
  return (
    <div className="w-full border-r gradient">
      <div className="flex h-[70px] sm:px-[40px] px-5 items-center border-b-[1px]">
        <p className="text-[20px]">My Portfolio</p>
      </div>
      <div className="w-full flex md:flex-row flex-col sm:px-10 px-5 py-[20px] ">
        <div className="flex flex-col sm:px-[20px] px-0 py-[10px] mr-[5px] min-w-[260px]">
          <div className="flex w-[100%] flex-col sm:px-[20px] px-0 py-[10px] mr-[5px]">
            <div className="flex flex-col">
              <p className=" text-[10px] font-bold">TOTAL EARNINGS</p>
              <p className=" text-[26px] font-MinionPro">
                13,050.45
                <span className="text-secondary text-[20px] pl-[5px]">AED</span>
              </p>
              <TotalEarningProgressBar
                data={TotalEarningsData.one}
                color="text-[#009DFF]"
                barColor="sky-prograss-bar"
              />
              <TotalEarningProgressBar
                data={TotalEarningsData.two}
                color="text-[#9F83FF]"
                barColor="violet-prograss-bar"
              />
              <TotalEarningProgressBar
                data={TotalEarningsData.three}
                color="text-[#00B8BF]"
                barColor="teal-prograss-bar"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full border-l-[1px] border-[#D4E4F2] pl-5 flex-col">
          <div className="flex justify-between w-full sm:pr-5">
            <h2 className="flex text-[20px]">Potfolio Holdings.</h2>

            <div className="px-1 py-1 border bg-white rounded-full place-self-center">
              <DownloadSimple size={14} />
            </div>
          </div>
          <div className="flex w-full mt-5 flex-row pr-6 gap-2">
            <div className="flex flex-row w-full">
              <p className="text-secondary text-[10px] border border-r-[0px] h-full text-center px-2 flex items-center justify-center bg-white font-bold">
                STATUS
              </p>
              <CustomSelect
                value={
                  FILTEROPTIONS.find(
                    (level) =>
                      level.value === searchParams?.sortBy &&
                      level.sortOrder === searchParams?.sortOrder
                  ) || FILTEROPTIONS[0]
                }
                options={FILTEROPTIONS}
                searchParams={searchParams}
                className="w-full"
              />
            </div>
            <div className="flex flex-row w-full justify-end">
              <p className="text-secondary text-[10px] border border-r-[0px] h-full text-center px-2 flex items-center justify-center bg-white font-bold">
                PERIOD
              </p>
              <CustomSelect
                value={
                  FILTERPERIOD.find(
                    (level) =>
                      level.value === searchParams?.sortBy &&
                      level.sortOrder === searchParams?.sortOrder
                  ) || FILTERPERIOD[0]
                }
                options={FILTERPERIOD}
                searchParams={searchParams}
                className="w-full"
              />
            </div>
          </div>
          <TableWrapper />
        </div>
      </div>
    </div>
  );
};

export default Profile;
