"use client";

import { useSearchParams } from "next/navigation";

import PublishForm from "@/app/campaigns/_comps/Forms/PublishForm";
import DetailsForm from "@/app/campaigns/_comps/Forms/DetailsForm";
import LocationForm from "@/app/campaigns/_comps/Forms/LocationForm";
import AmenitiesForm from "@/app/campaigns/_comps/Forms/AmenitiesForm";
import ImagesForm from "@/app/campaigns/_comps/Forms/ImagesForm";
import DocumentsForm from "@/app/campaigns/_comps/Forms/DocumentsForm";
import FinancialsForm from "@/app/campaigns/_comps/Forms/FinancialsForm";
import AccordinSkeleton from "@/components/Accordion/Skeleton";
import FeeStructureForm from "@/app/campaigns/_comps/Forms/FeeStructure";
import useGetCampaignDetails from "@/hooks/services/campaign/getCampaignDetails";
import { setValuesToObject } from "@/app/campaigns/_comps/Forms/FeeStructure/utils";
import { useGetFeeStructureQuery } from "@/store/services/campaigns/feeStructureApi";

const CampaignDetailsForm = () => {
  const searchParams = useSearchParams();
  const { campaignDetails, error, isLoadingCampain } = useGetCampaignDetails(
    searchParams.get("id")!,
  );

  // const { feeData, isLoadingFeeStructure } = useGetFeeStructure(
  // );

  const { data: feeData, isLoading: isLoadingFeeStructure } =
    useGetFeeStructureQuery({ campaignId: searchParams.get("id")! });

  if (error) return <div>SomeThing went wrong</div>;

  return (
    <div className="flex flex-col gap-3 h-full overflow-y-scroll mb-44 no-scrollbar">
      {!isLoadingCampain && campaignDetails ? (
        <>
          <PublishForm
            publishedAt={campaignDetails?.campaign.publishedAt}
            closedAt={campaignDetails?.campaign.closedAt}
          />
          <DetailsForm
            campaignId={searchParams.get("id")!}
            propertyDetails={campaignDetails?.property}
          />
          <LocationForm
            campaignId={searchParams.get("id")!}
            propertyLocation={campaignDetails?.location}
          />
          <AmenitiesForm
            campaignAmenities={campaignDetails.amenities}
            assetId={campaignDetails.property._id}
          />
          <ImagesForm
            assetId={campaignDetails.property._id}
            assetMediaFiles={campaignDetails?.files.filter(
              (file) => file.fileKey === "assetPhotos",
            )}
          />
          <DocumentsForm
            assetId={campaignDetails.property._id}
            campaignId={searchParams.get("id")!}
            propertyDocuments={campaignDetails?.files.filter(
              ({ fileKey }: { fileKey: string }) => fileKey !== "assetPhotos",
            )}
          />
          <FinancialsForm
            assetId={campaignDetails.property._id}
            campaignId={searchParams.get("id")!}
            propertyFinancials={campaignDetails.financialDetails}
          />

          {!isLoadingFeeStructure && feeData && (
            <FeeStructureForm
              feeStructureId={feeData.data.feeStructureId}
              propertyFee={setValuesToObject(feeData?.data?.fee)}
            />
          )}
        </>
      ) : (
        Array.from({ length: 7 }).map((_, index) => {
          return <AccordinSkeleton key={index} />;
        })
      )}
    </div>
  );
};

export default CampaignDetailsForm;
