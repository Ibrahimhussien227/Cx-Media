import PropertyCardDetails from "./PropertyCardDetails";
import { ChartLineUp } from "@/utils/icons";
import MapContainer from "@/components/MapContainer";

const PropertyCard = ({
  data,
  forTransfer,
  count,
}: ICampaignData & { count?: string; forTransfer?: boolean }) => {
  const {
    assetGeolocationLong,
    assetGeolocationLat,
    assetAddressOne,
    assetCity,
    assetLocationArea,
  } = data.assetDetails.assetLocation;

  return (
    <div
      className="transition-all flex flex-col border rounded-sm bg-gradient-to-t from-white to-[#FFFAF8] mt-5 lg:w-[34%] w-[100%] h-[80%]"
      style={{
        transition: "height 0.3s ease-in-out",
      }}
    >
      <div className="flex flex-col ml-2 mt-2 px-4">
        <div className="border rounded-full flex flex-row gap-1 px-2 py-1 w-fit bg-white">
          <ChartLineUp className="text-active" />
          <p className="text-secondary text-[10px]">
            SHORT TERM RESIDENTIAL RENTAL
          </p>
        </div>
        <p className="text-[22px] font-MinionPro py-2">
          {data.assetDetails.assetName}
        </p>
      </div>
      <div className="relative w-full h-72 flex justify-center overflow-hidden rounded-sm px-2 py-2">
        <MapContainer
          popupTitle={assetLocationArea}
          popupDescription={`${assetAddressOne}, ${assetCity}`}
          longitude={+assetGeolocationLong}
          latitude={+assetGeolocationLat}
          showPopup
        />
      </div>

      <PropertyCardDetails
        data={data}
        forTransfer={forTransfer}
        count={count}
      />
    </div>
  );
};
export default PropertyCard;
