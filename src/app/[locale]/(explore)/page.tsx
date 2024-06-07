import { getCampaigns } from "@/utils/api/campaignsApi/getCampaignsApi";
import { createProfile, getInvestor } from "@/utils/api/InvestorApi";
import { INVESTOR_APPLICATION_STATUS } from "@/types/enum.constants";
import NavFilter from "./_components/NavFilters";
import LoadMore from "./_components/LoadMore";
import TableWrapper from "./_components/TableWrapper";
import PropertyCard from "./_components/PropertyCard";
import NotificationCardVerify from "./_components/NotificationCardVerify";
import { revalidateTag } from "next/cache";

const Explore = async ({
  searchParams,
}: {
  searchParams: { [type: string]: string };
}) => {
  const campaigns = await getCampaigns({
    searchParams,
  });
  const investorData = await getInvestor();

  if (investorData?.length === 0) {
    await createProfile().then(() => {
      revalidateTag("investor-data");
    });
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full flex h-[70px] sm:px-10 px-5 items-center border-b-[1px]">
        <h1 className="text-[20px] font-MinionPro">Explore</h1>
      </div>
      {!INVESTOR_APPLICATION_STATUS.VERIFIED.includes(
        investorData?.applicationStatus
      ) && <NotificationCardVerify />}

      <div className="w-full flex flex-col px-10 py-[20px] h-full overflow-hidden">
        <NavFilter searchParams={searchParams} />
        {campaigns?.data?.length ? (
          searchParams.direction !== "list" ? (
            <div className="grid grid-cols-3 gap-y-5 gap-5 h-screen overflow-y-scroll pb-44 no-scrollbar">
              {campaigns.data.map((property: ICampaignData["data"]) => (
                <PropertyCard key={property.campaignId} data={property} />
              ))}
              <LoadMore searchParams={searchParams} />
            </div>
          ) : (
            <div className="h-screen overflow-y-scroll pb-44 no-scrollbar">
              <TableWrapper searchParams={searchParams} data={campaigns.data} />
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Explore;
