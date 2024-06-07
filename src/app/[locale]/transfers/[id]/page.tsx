import Link from "next/link";

import { ArrowLeft } from "@/utils/icons";

import { getCampaignsDetails } from "@/utils/api/campaignsApi/getCampaignsDetailsApi";
import PropertyDetailsSection from "@/components/PropertyDetailsSection";
import DocumentsSection from "@/components/DocumentsSection";
import PropertyCard from "@/app/[locale]/(explore)/explore/[id]/_components/PropertyCard";
import Carousel from "@/components/Carousel";

const ExploreDetails = async ({
  params,
}: {
  params: { [id: string]: string };
}) => {
  const { id } = params;
  const campaign = await getCampaignsDetails({ id });

  const { assetDetails } = campaign;

  const assetsMedia = assetDetails.assetMediaFiles.filter(
    ({ fileKey }: { fileKey: string }) => fileKey === "assetPhotos"
  );

  return (
    <div className="scroll-smooth h-screen overflow-hidden">
      <div className="flex w-full h-[70px] border-b-[1px] flex-row items-center justify-start">
        <Link
          href="/"
          className="flex flex-row w-fit items-center justify-start h-full text-[10px] font-bold ]  px-10"
        >
          <p className="flex flex-row items-center justify-start gap-2">
            <ArrowLeft size={20} />

            <span className="text-secondary font-bold uppercase">TRANSFER</span>
            <span className="mr-2 ml-2 text-secondary">|</span>
            <span className="text-secondary font-bold uppercase">
              AVAILABLE LISTINGS
            </span>
            {/* <span className="mr-2 ml-2 text-secondary">|</span> */}
            {/* <span>{assetDetails.assetName}</span> */}
          </p>
        </Link>
      </div>
      <div className="w-full flex lg:flex-row flex-col justify-between px-10 h-full">
        <div className="lg:w-[65%] w-[100%] py-5 h-full overflow-scroll pb-16 no-scrollbar">
          <div className="flex justify-between gap-y-5 w-full flex-wrap">
            <div className="relative h-[400px] w-full">
              <Carousel isDetail slides={assetsMedia} />
            </div>
            {/* <InvestmentCalculatorSection /> */}
            <PropertyDetailsSection assetDetails={assetDetails} />
            {/* <TimeLineSection /> */}
            <DocumentsSection />

            <span className="h-[1px] bg-[#d4e4f280] w-full flex mt-4" />
            <div className="flex justify-between w-full p-5 pt-0">
              <div className="text-secondary] text-[10px] font-bold tracking-[1.5px]">
                {/* PROPERTY ID <span>{assetDetails.assetAppId}</span> */}
              </div>
              <div className="text-secondary text-[10px] font-bold tracking-[1.5px]">
                CAMPAIGN APT-<span>{campaign.campaignId}</span>
              </div>
            </div>
          </div>
        </div>
        <PropertyCard data={campaign} forTransfer />
      </div>
    </div>
  );
};

export default ExploreDetails;
