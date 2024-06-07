import React from "react";
import { useTranslations } from "next-intl";

import TabBar from "@/components/TabBar";
import GridOption from "./GridOption";
import { FILTEROPTIONS, GRIDOPTION, TABOPTIONS } from "./config";
import CustomSelect from "@/components/CustomSelect";

const PropertyFilter = ({ searchParams }: ISearchParamsProps) => {
  const t = useTranslations("InvestorDashboardPage.explorePage");

  return (
    <div className="flex flex-row items-center w-full justify-between lg:ml-20 ml-5">
      <TabBar
        options={TABOPTIONS}
        value={
          TABOPTIONS.find((op) => op.value === searchParams?.type) ||
          TABOPTIONS[0]
        }
        searchParams={searchParams}
      />
      <div className="flex justify-between">
      <div className="flex flex-row items-center justify-center min-w-[200px] mx-2">
        <p className="text-secondary text-[10px] text-center flex justify-center font-bold px-2 border bg-white h-full py-2">
          {t("filterSortBy")}
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
        />
        </div>
      </div>

      <GridOption
        options={GRIDOPTION}
        value={
          GRIDOPTION.find((op) => op.value === searchParams?.direction) ||
          GRIDOPTION[0]
        }
        searchParams={searchParams}
      />
    </div>
  );
};

export default PropertyFilter;
