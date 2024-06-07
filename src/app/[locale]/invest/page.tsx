import React from "react";
import { getTranslations } from "next-intl/server";

import HeroSection from "@/components/HeroSection";
import TabBar from "@/components/TabBar";
import { getCampaigns } from "@/utils/api/getCampaigns";
import PropertyCard from "./_components/PropertyCard";
import { TABOPTIONS } from "./config";

const Invest = async ({ searchParams }: ISearchParamsProps) => {
  const t = await getTranslations("LandingPage.investPage");

  const campaigns = await getCampaigns({
    searchParams,
  });

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full gap-y-1 mt-12 ">
        <h1 className="text-[30px] tracking-[0px] font-normal">
          {t("pageTitle")}
        </h1>
        <p className="text-secondary tracking-[0px] text-[14px]">
          {t("pageDescription")}
        </p>
        <div className="mt-5">
          <TabBar
            options={TABOPTIONS}
            value={
              TABOPTIONS.find((op) => op.value === searchParams?.type) ||
              TABOPTIONS[0]
            }
            searchParams={searchParams}
          />
        </div>
        <div className="w-[80%] justify-start items-start gap-5 grid grid-cols-3  mt-8 mb-16">
          {campaigns.data.map((property: ICampaignData["data"]) => (
            <PropertyCard
              searchParams={searchParams}
              key={property.assetDetails.assetName}
              data={property}
            />
          ))}
        </div>
      </section>

      <HeroSection
        header={t("heroSectionTitle")}
        descreption={t("heroSectionDescription")}
        bgColor="bg-white"
      />
    </>
  );
};

export default Invest;
