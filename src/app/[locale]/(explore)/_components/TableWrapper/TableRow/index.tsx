import { useRouter } from "next/navigation";
import Image from "next/image";

import ProgressBar from "@/components/ProgressBar";
import { IDataCellsCampaigns } from "../../../type";
import { moneyFormatter } from "@/utils/fromatNumber";

const TableRow = ({ data }: IDataCellsCampaigns) => {
  const router = useRouter();
  const {
    asset,
    noOfShares,
    propertyPrice,
    projectedAnnualizedReturn,
    projectedAnnualAppreciation,
    projectedGrossYield,
    projectedNetYield,
    minimumInvestment,
  } = data;

  const percent = (noOfShares?.remaining / noOfShares?.total) * 100;

  const assetsMedia = asset.assetMediaFiles?.filter(
    ({ fileKey }: { fileKey: string }) => fileKey === "assetPhotos"
  );

  return (
    <tr
      className="default-custom-table cursor-pointer py-[20px] hover:bg-white group transition-all duration-500 ease-in-out"
      onClick={() => {
        router.push(`/explore/${asset.id}`);
      }}
    >
      <td className="p-0 h-full">
        {/* Flat Div */}

        <div className="h-full flex justify-start items-center">
          <Image
            unoptimized
            src={assetsMedia[0]?.filePath || "/images/not-found.png"}
            alt="property"
            width={120}
            height={120}
          />
          <p className="font-MinionPro p-3 text-[16px] w-[300px] truncate tracking-[0px]">
            {asset.name}
          </p>
        </div>
      </td>
      {/* status */}
      <td>
        <div className="flex flex-col items-center">
          <ProgressBar
            percent={percent}
            color={percent > 50 ? "red-prograss-bar" : "green-prograss-bar"}
          />
          <p className="text-[10px] font-bold tracking-[0px]">
            {noOfShares.remaining} / {noOfShares.total}
          </p>
        </div>
      </td>
      {/* shares */}
      <td>
        <p className="text-[16px] w-full text-end tracking-[0px] font-MinionPro">
          {propertyPrice}{" "}
          <span className="text-secondary text-[12px]">AED</span>
        </p>
      </td>
      {/* earnings */}
      <td>
        <p className="text-[16px] font-MinionPro tracking-[0px] text-center">
          {projectedAnnualizedReturn}%
        </p>
      </td>
      <td>
        <p className="text-[16px] font-MinionPro tracking-[0px] text-center">
          {projectedAnnualAppreciation}%
        </p>
      </td>
      <td>
        <p className="text-[16px] font-MinionPro tracking-[0px] text-center">
          {projectedGrossYield}%
        </p>
      </td>
      <td>
        <p className="text-[16px] font-MinionPro tracking-[0px] text-center">
          {projectedNetYield}%
        </p>
      </td>
      {/* purchased */}
      <td className="bg-default ">
        <div className="flex flex-col gap-2 font-MinionPro w-full items-center justify-center">
          <p className="text-white text-[20px] tracking-[0px]">
            {moneyFormatter.format(minimumInvestment.amount)}{" "}
            <span className="text-[12px] text-[#D4E4F2]">AED</span>
          </p>
          <p className="text-[14px] text-[#D4E4F2] text-end tracking-[0px]">
            / {minimumInvestment.shares} Shares
          </p>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
