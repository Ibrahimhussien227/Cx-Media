import React from "react";
import { useTranslations } from "next-intl";

import CustomSelect from "@/components/CustomSelect";
import TabBar from "@/components/TabBar";
import DebouncedInput from "@/components/DebouncedInput";
import ModalWrapper from "./_components/ModalWrapper";
import AvListTableWrapper from "./_components/AvListTableWrapper";
import MyListTableWrapper from "./_components/MyListTableWrapper";
import { FILTERPERIOD, TABOPTIONS } from "./configs";

const Transfers = ({ searchParams }: ISearchParamsProps) => {
  const t = useTranslations("InvestorDashboardPage.explorePage");

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  return (
    <div className="w-full border-r gradient">
      <div className="relative flex h-[70px] sm:px-[40px] px-5 items-center border-b-[1px]">
        <p className="text-[20px]">Transfers</p>
        <ModalWrapper searchParams={searchParams} />
      </div>
      {/* Search/filter options Bar */}
      <div className="flex sm:flex-row flex-col w-full h-[80px] justify-center items-center">
        <div className="sm:px-[35px]  sm:pl-[60px] pr-[30px] mr-[5px] sm:min-w-[25%] tracking-wider">
          <TabBar
            className="w-full"
            options={TABOPTIONS}
            value={
              TABOPTIONS.find((op) => op.value === searchParams?.type) ||
              TABOPTIONS[0]
            }
            searchParams={searchParams}
          />
        </div>
        <div className="flex w-full flex-row justify-between sm:px-0 px-5">
          <DebouncedInput
            placeholder={t("searchPlaceHolder")}
            value={search}
            title="SEARCH"
            searchParams={searchParams}
          />
          <div className="flex flex-row w-full justify-end mr-[70px]">
            <p className="text-secondary text-[10px] border border-r-[0px] h-full text-center px-2 flex items-center justify-center bg-white font-bold">
              SORT BY
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
            />
          </div>
        </div>
      </div>
      <div className="w-full flex md:flex-row flex-col px-10 py-[20px] ">
        {searchParams.type == "MY" ? (
          <MyListTableWrapper />
        ) : (
          <div className="flex w-full border-[#D4E4F2] sm:pl-5 flex-col">
            <AvListTableWrapper />
          </div>
        )}
      </div>
    </div>
  );
};

export default Transfers;
