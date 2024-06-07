import Link from "next/link";
import { redirect } from "next/navigation";

import { ArrowLeft } from "@/utils/icons";
import { getCampaignsDetails } from "@/utils/api/campaignsApi/getCampaignsDetailsApi";
import Notes from "./_components/Notes";
import PropertyDetails from "./_components/ConfirmSection/PropertyDetails";
import PurchaseDetails from "./_components/ConfirmSection/PurchaseDetails";
import OTPForm from "./_components/OtpForm";
import ConfirmCard from "./_components/ConfirmCard";

const ConfirmInvestment = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) => {
  const campaign = await getCampaignsDetails({ id: params.id });

  if (
    searchParams.count == undefined ||
    searchParams.count == null ||
    searchParams.count == ""
  )
    redirect(".");

  return (
    <div className="w-full border-r gradient scroll-smooth overflow-auto no-scrollbar ">
      <div className="flex w-full h-[70px] border-b-[1px] flex-row items-center justify-start">
        <Link
          href="."
          className="flex flex-row w-fit items-center justify-start h-full text-[10px] font-bold px-10"
        >
          <p className="flex flex-row items-center justify-start gap-2">
            <ArrowLeft size={20} />

            <span className="text-secondary font-bold uppercase">EXPLORE</span>
            <span className="mr-2 ml-2 text-secondary">|</span>
            <span className="text-secondary font-bold uppercase">
              {" "}
              {campaign.assetDetails.assetName}
            </span>
            <span className="mr-2 ml-2 text-secondary">|</span>
            <span>CONFIRM INVESTMENT</span>
          </p>
        </Link>
      </div>
      <div className="w-full flex justify-center py-5 h-full overflow-hidden">
        <div className="w-[30%] flex flex-col items-center h-full overflow-scroll pb-16 no-scrollbar relative">
          {searchParams.otp != "true" ? (
            <>
              <h2 className="text-[26px] font-MinionPro mt-2 mb-10">
                Confirm your investment.
              </h2>
              <span className="w-10 h-[2px] bg-[#FF6C02] absolute left-[48%] top-[60px]" />
              <PropertyDetails campaign={campaign} />
              <PurchaseDetails
                searchParams={searchParams}
                campaign={campaign}
              />
            </>
          ) : searchParams.auth == "true" ? (
            <ConfirmCard />
          ) : (
            <OTPForm searchParams={searchParams} />
          )}
          <Notes />
        </div>
      </div>
    </div>
  );
};

export default ConfirmInvestment;
