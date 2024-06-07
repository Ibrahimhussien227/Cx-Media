"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { getCampaigns } from "@/utils/api/campaignsApi/getCampaignsApi";
import { IDataCellsCampaigns } from "../../type";
import TableRow from "../TableWrapper/TableRow";
import { campaigns } from "../../config";
import Loading from "@/app/[locale]/loading";
import PropertyCard from "../PropertyCard";

const LoadMore = ({ searchParams }: ISearchParamsProps) => {
  const [campaignsData, setCampaignsData] = useState<ICampaignData["data"][]>(
    []
  );
  const [checkParams, setCheckParams] = useState(searchParams);

  const [page, setPage] = useState(2);

  const { ref, inView } = useInView();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const loadMoreCampaigns = async () => {
      await delay(3000);

      const newProducts = await getCampaigns({ searchParams, page });

      if (newProducts?.data && newProducts?.data.length) {
        setCampaignsData((prevCampaigns) => [
          ...prevCampaigns,
          ...newProducts.data,
        ]);
        setPage((prevState) => prevState + 1);
      } else {
        setPage(0);
      }
    };
    if (inView && page !== 0) {
      loadMoreCampaigns();
    }

    if (searchParams !== checkParams) {
      // If searchParams changed, reset page and campaignsData
      setCampaignsData([]);
      setPage(2); // or set it to your initial page value
      loadMoreCampaigns();
    }

    // Save the current searchParams for the next comparison
    setCheckParams(searchParams);
  }, [inView, page, searchParams, checkParams]);

  if (searchParams.direction !== "list") {
    return (
      <>
        {campaignsData.map((property: ICampaignData["data"]) => (
          <PropertyCard key={property.campaignId} data={property} />
        ))}
        {page !== 0 && (
          <div
            className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
            ref={ref}
          >
            <Loading />
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {campaigns(campaignsData).map(
          (property: IDataCellsCampaigns["data"]) => {
            return <TableRow key={property.asset.name} data={property} />;
          }
        )}
        {page !== 0 && (
          <tr
            ref={ref}
            className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3 relative"
          >
            <td className="flex w-full h-full items-center justify-center absolute left-[100%]">
              <div className="spinner" />
            </td>
          </tr>
        )}
      </>
    );
  }
};

export default LoadMore;
