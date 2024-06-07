import { useTranslations } from "next-intl";

import Link from "next/link";
import { ArrowRight } from "@/utils/icons";
import PropertyInfoBox from "./PropertyInfoBox";
import { AUTH_URL } from "@/constants";

const PropertyCardDetails = ({
  isOpen = true,
  data,
  searchParams,
}: ICampaignData & {
  isOpen?: boolean;
  children?: React.ReactNode;
  searchParams: ISearchParamsProps["searchParams"];
}) => {
  const t = useTranslations("PropertyCard");

  const { financialDetails } = data;

  return (
    <div
      className={`flex flex-col gap-6 bg-gradient-to-b from-white to-[#FFFAF8] ${
        searchParams?.type ?? "AVAILABLE" === "AVAILABLE" ? "mt-2" : "mt-6"
      } h-full`}
    >
      {searchParams?.type && searchParams?.type !== "AVAILABLE" ? (
        <>
          <div
            className={`flex flex-row items-center text-xs justify-between px-2 bg-[#FFFAF8] py-2 rounded-[15px] mx-4 ${
              searchParams?.type === "FUNDED" ? "bg-[#EDF7FF]" : "bg-[#FFF4F4]"
            }`}
          >
            <p className="text-[10px] font-bold">
              {searchParams?.type === "FUNDED"
                ? "FUNDING CLOSED ON"
                : "SOLD ON"}
            </p>

            <p className="text-[10px] font-bold">
              {financialDetails?.noOfSharesRemaining} /{" "}
              {financialDetails?.noOfShares}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-gray-400 px-4">
            <PropertyInfoBox
              title={t("annualizedReturn")}
              value={financialDetails?.projectedAnnualizedReturn}
            />
            <PropertyInfoBox
              title={t("annualizedAppreciatiom")}
              value={financialDetails?.projectedAnnualAppreciation}
            />
            <PropertyInfoBox
              title={t("projectGrossYield")}
              value={financialDetails?.projectedGrossYield}
            />
            <PropertyInfoBox
              title={t("projectNetYield")}
              value={financialDetails?.projectedNetYield}
            />
          </div>
          <div className="flex text-lg flex-row justify-between items-center bg-[#2C3A5C] px-4 py-4">
            <div>
              <p className="text-[#D4E4F2] text-[10px] font-bold">INVESTORS</p>
              <div className="flex flex-row gap-2 font-minion">
                <p className="text-white text-[20px]">
                  {financialDetails?.numberOfInvestors}
                </p>
                <p className="text-[14px] text-white">
                  AED/ {financialDetails?.minimumInvestmentShare} Shares
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-4">
              <Link
                href={AUTH_URL}
                passHref={true}
                className="bg-active text-xs text-white flex flex-row gap-x-4 rounded-[2px] py-2 px-4 items-center justify-center"
              >
                {t("view")}
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div
          className={` overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? " opacity-100" : "h-0 opacity-0"
          }`}
        >
          <div className="flex flex-row justify-between items-center bg-[#2C3A5C] px-4 py-4">
            <p className="text-[#D4E4F2] text-[12px] font-bold tracking-[0px]">
              Login or register to view more
              <br /> details and invest.
            </p>

            <div className="flex flex-row items-center justify-between gap-4">
              <Link
                href={AUTH_URL}
                passHref={true}
                className="bg-active text-xs text-white flex flex-row gap-x-4 rounded-[2px] py-2 px-4 items-center justify-center"
              >
                {`LET'S GO`}
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCardDetails;
