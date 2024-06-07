"use client";

import { useState } from "react";

import ProgressBar from "@/components/ProgressBar";
import CustomButton from "@/components/CustomButton";
import Coursel from "@/components/Carousel";
import { CaretDown } from "@/utils/icons";
import ShowcaseCardDetails from "./ShowcaseCardDetails";

const PropertyCard = ({ data }: ICampaignData) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const { assetDetails, campaignStatus, financialDetails } = data;

  const assetsMedia = assetDetails?.assetMediaFiles.filter(
    ({ fileKey }: { fileKey: string }) => fileKey === "assetPhotos"
  );
  const percent =
    (financialDetails?.noOfSharesRemaining / financialDetails?.noOfShares) *
    100;

  return (
    <div
      className={`relative grid overflow-hidden transition-all duration-700 ${
        isDetailsOpen ? "grid-rows-[40%_60%]" : "grid-rows-[100%_0%]"
      } h-[30rem] max-w-full bg-white rounded-sm`}
      style={{
        boxShadow: "0 0rem 1.8rem -0.65rem gray",
      }}
    >
      <div className="relative flex flex-col">
        <div className={`${isDetailsOpen ? "h-[80%]" : "h-[85%]"} `}>
          <Coursel slides={assetsMedia} />
        </div>
        <div
          className={`relative flex flex-grow items-center justify-between gap-x-2 whitespace-nowrap px-4 pb- pt-5 text-sm  pb-2`}
        >
          <p>{assetDetails.assetName}</p>
          <p>
            {financialDetails.propertyPrice.toLocaleString()}{" "}
            <span className="text-gray-500">AED</span>
          </p>

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
        <div className={`px-4 ${isDetailsOpen ? "pb-6" : "pb-3"}`}>
          <ProgressBar
            percent={percent}
            color={percent > 50 ? "red-prograss-bar" : "green-prograss-bar"}
          />
        </div>
      </div>
      <ShowcaseCardDetails data={data} />
    </div>
  );
};

export default PropertyCard;
