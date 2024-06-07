import React from "react";
import { useTranslations } from "next-intl";

import PropertyFilter from "./PropertyFilter";
import DebouncedInput from "@/components/DebouncedInput";

const NavFilter = ({ searchParams }: ISearchParamsProps) => {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const t = useTranslations("InvestorDashboardPage.explorePage");

  return (
    <div className="mb-4 flex  justify-between md:flex-row flex-col items-center w-full text-secondary">
      <DebouncedInput
        placeholder={t("searchPlaceHolder")}
        value={search}
        title="SEARCH"
        searchParams={searchParams}
      />
      <PropertyFilter searchParams={searchParams} />
    </div>
  );
};

export default NavFilter;
