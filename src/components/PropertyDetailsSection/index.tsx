import React from "react";

import Tags from "@/components/Tags";
import MapContainer from "@/components/MapContainer";
import { IPropertyDetailsSection } from "./type";
import ExpandText from "./ExpandText";

const PropertyDetailsSection = ({ assetDetails }: IPropertyDetailsSection) => {
  const { assetLocation, assetAmenities } = assetDetails;

  return (
    <section className="relative flex h-full flex-col w-full bg-gradient-to-b from-white to-[#FFFAF8] p-5">
      <div className="absolute w-[2px] h-3 bg-active left-[-1px] top-5" />

      <div className="flex flex-col w-full mb-4">
        <p className="text-secondary text-[10px] font-bold mb-2">
          PROPERTY DETAILS.
        </p>

        <ExpandText assetDescription={assetDetails.assetDescription} />
        <div className="flex flex-col w-full mb-4">
          <p className="font-MinionPro text-[18px] mb-1">
            Specification.
            <span className="h-[1px] bg-[#d4e4f280] w-full ml-1" />
          </p>
          <p className="text-secondary text-[12px]">
            {assetDetails.assetArea} sq.ft Villa | {assetDetails.numberOfBed}{" "}
            Bed | {assetDetails.numberOfBath} Bath
          </p>
        </div>
        <div className="flex flex-col w-full mb-4">
          <p className="font-MinionPro text-[18px] flex  items-center mb-1">
            Amenities.
            <span className="h-[1px] bg-[#d4e4f280] w-full flex ml-1" />
          </p>
          <div className="flex flex-wrap gap-2">
            {assetAmenities?.map(({ amenitiesId, amenitiesName }) => (
              <Tags key={amenitiesId} title={amenitiesName} />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full mb-4">
          <p className="font-MinionPro text-[18px] flex items-center mb-1">
            Address.
            <span className="h-[1px] bg-[#d4e4f280] w-full flex ml-1"></span>
          </p>
          <p className="text-secondary text-[12px]">
            {assetLocation.assetLocationArea} ,{assetLocation.assetCity} ,
            {assetLocation.assetCountry}
          </p>
        </div>
      </div>
      <div className="relative w-full h-[18rem] flex justify-center overflow-hidden rounded-sm px-2 py-2">
        <MapContainer
          longitude={+assetLocation?.assetGeolocationLong}
          latitude={+assetLocation?.assetGeolocationLat}
        />
      </div>
    </section>
  );
};

export default PropertyDetailsSection;
