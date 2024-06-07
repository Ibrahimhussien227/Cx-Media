"use client";

import { useState } from "react";

import Carousel from "@/components/Carousel";
import { CaretDown } from "@/utils/icons";
import PropertyCardDetails from "./PropertyCardDetails";
import CustomButton from "@/components/CustomButton";

const PropertyCard = ({
  data,
  searchParams = { type: "AVAILABLE" },
}: ICampaignData & { searchParams: ISearchParamsProps["searchParams"] }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const { assetDetails, campaignStatus, financialDetails } = data;

  const assetsMedia = assetDetails?.assetMediaFiles.filter(
    ({ fileKey }: { fileKey: string }) => fileKey === "assetPhotos"
  );

  const campaignStatusParams = searchParams?.type ?? "AVAILABLE";

  return (
    <div
      className={`relative grid overflow-hidden transition-all duration-700 ${
        campaignStatusParams === "AVAILABLE" && isDetailsOpen
          ? "grid-rows-[85%_15%]"
          : isDetailsOpen
          ? "grid-rows-[40%_60%]"
          : "grid-rows-[100%_0%]"
      } h-[30rem] max-w-full bg-white rounded-sm`}
      style={{
        boxShadow: "0 0rem 1.8rem -0.65rem gray",
      }}
    >
      <div className="relative flex flex-col">
        <div
          className={`${
            campaignStatusParams && isDetailsOpen
              ? "h-[90%]"
              : isDetailsOpen
              ? "h-[80%]"
              : "h-[85%]"
          }`}
        >
          <Carousel slides={assetsMedia} autoSlide={false} />
        </div>
        <div
          className={`relative flex flex-grow items-center justify-between gap-x-2 whitespace-nowrap px-4 pt-5 text-sm  pb-2`}
        >
          <p>{assetDetails.assetName}</p>
          {campaignStatusParams && (
            <p className="text-[16px] w-full text-end">
              {financialDetails?.propertyPrice}{" "}
              <span className="text-secondary text-[12px]">AED</span>
            </p>
          )}

          <div className="flex items-center justify-center bg-[#2c3a5c80] z-40 h-[20px] py-0.5 px-2 border absolute -top-[2.2rem] left-[1rem]">
            <p className="text-white font-bold text-[11px]">{campaignStatus}</p>
          </div>

          <CustomButton
            onClick={() => {
              setIsDetailsOpen((currentValue) => !currentValue);
            }}
            className="absolute right-2 border ltr:right-auto rtl:left-2 z-[1] flex items-center justify-center size-8 rounded-full bg-white rotate-180 bottom-auto end-2 top-0 -translate-y-1/2"
          >
            <CaretDown
              size={16}
              className={`shrink-none ${
                isDetailsOpen ? "rotate-180" : "rotate-0"
              } transition-all`}
            />
          </CustomButton>
        </div>
      </div>
      <PropertyCardDetails
        searchParams={searchParams}
        data={data}
        isOpen={isDetailsOpen}
      />{" "}
    </div>
  );
};
export default PropertyCard;
