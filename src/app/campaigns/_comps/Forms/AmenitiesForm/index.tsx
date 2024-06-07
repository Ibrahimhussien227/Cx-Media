"use client";

import { useEffect, useState } from "react";

import InfoTag from "@/components/InfoTag";
import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import { useGetConfig } from "@/hooks/services/campaign/getConfig";
import Spinner from "@/components/Spinner";
import { useUpdateAssetAmenityMutation } from "@/store/services/campaigns/assetDetailsApi";
import { IAmenitiesForm } from "./type";
import { AddProperty } from "./utils";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";

const AmenitiesForm = ({ campaignAmenities, assetId }: IAmenitiesForm) => {
  const { configData: APIamenities, isLoading } = useGetConfig("amenity");
  const [initAmenities, setinitAmenities] = useState<string[]>([]);
  const [activeAmenites, setActiveAmenities] = useState<string[]>([]);

  // setting initial values (array of strings) for initAmenities(preserved) & activeAmenities(user-interactive)
  useEffect(() => {
    const initAmenities: string[] = [];
    campaignAmenities.forEach((amenity) => {
      initAmenities.push(amenity.amenitiesName);
    });
    setActiveAmenities([...initAmenities]);
    setinitAmenities([...initAmenities]);
  }, [campaignAmenities]);

  // amenity => onCLick Handler
  const activeAmenitiyHandler = (configValue: string) => {
    let updatedActiveAmenites: string[] = [];
    const exist = activeAmenites.find((amenity) => amenity == configValue);
    // if exist remove amenity
    if (exist) {
      updatedActiveAmenites = activeAmenites.filter(
        (amenity) => amenity != configValue
      );
      setActiveAmenities(updatedActiveAmenites);
    }
    // if doesn't add amenity
    else {
      updatedActiveAmenites = [...activeAmenites, configValue];
      setActiveAmenities(updatedActiveAmenites);
    }
  };

  const isDirty =
    JSON.stringify(activeAmenites) !== JSON.stringify(initAmenities);

  const [updateAmenity] = useUpdateAssetAmenityMutation();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    updateAmenity({
      assetId: assetId,
      amenitiesNames: activeAmenites,
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={submitHandler}
      className="col-start-1 md:col-end-4 bg-white p-5"
    >
      <Accordion
        title="Amenities"
        status={campaignAmenities.length > 0 ? "COMPLETE" : "PENDING"}
        EditButton={
          <div
            className={`${
              !isDirty && "opacity-50"
            } flex flex-row w-full justify-between items-center gap-3`}
          >
            {!isLoading ? (
              <>
                <CustomButton
                  className={`p-2 ml-auto font-[300] px-3 py-1 rounded-none animate-fade border ${
                    false && "hover:bg-[#F5F8FF]"
                  }`}
                  onClick={() => setActiveAmenities(initAmenities)}
                  disabled={false}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  type="submit"
                  className="bg-primary text-[white] px-3 py-1 font-[300] rounded-none animate-fade"
                  disabled={false}
                >
                  Update
                </CustomButton>
              </>
            ) : (
              <Spinner />
            )}
          </div>
        }
      >
        <div className="flex gap-[10px] flex-wrap">
          {campaignAmenities && APIamenities ? (
            AddProperty(APIamenities, activeAmenites).map((amenity) => (
              <InfoTag
                key={amenity.display}
                display={amenity.display}
                initActive={amenity.isActive}
                onClick={activeAmenitiyHandler}
              />
            ))
          ) : isLoading ? (
            <GridFormSkeleton />
          ) : (
            <div>No Amenities Found</div>
          )}
        </div>
      </Accordion>
    </form>
  );
};

export default AmenitiesForm;
