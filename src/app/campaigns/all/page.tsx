"use client";

import { ColumnDef } from "@tanstack/react-table";

import StatsCard from "@/components/StatsCard";
import CustomTable from "@/components/CustomTable";
import useGetCampaigns from "@/hooks/services/campaignAdmin/getListCampaigns";
import { STATUS } from "@/types/enum.constants";
import StatsSkeleton from "@/components/Skeleton/Stats";

import { COLUMNS, STATUSOPTIONS } from "./configs";
import TableSkeleton from "@/components/Skeleton/Table";

const PublishedCampaigns = () => {
  const { structuredData, stats, isLoading, error, tableCount } =
    useGetCampaigns({
      statsType: "campaign",
    });

  console.log();

  const approvedCampaign = structuredData?.data.filter((property) => {
    return property.property.reviewStatus === STATUS.APPROVED_TO_PUBLISH;
  });

  return (
    <section className="m-5">
      <div className="bg-white p-5 mb-3 w-full">
        <p className="mb-2 font-bold text-[16px]">All Campaigns</p>
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <StatsSkeleton key={index} />
              ))
            : stats.map(({ title, value, icon }) => (
                <StatsCard
                  key={`${title}${value}`}
                  title={title}
                  count={value ?? ""}
                  icon={icon}
                />
              ))}
        </div>
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="bg-white w-full overflow-x-scroll">
          <CustomTable
            data={
              approvedCampaign?.map((item) => ({
                _id: item.campaign._id,
                ...item,
              })) || []
            }
            statusOptions={(!error && STATUSOPTIONS) || {}}
            columns={COLUMNS as ColumnDef<{ _id?: string }>[]}
            tableCount={tableCount}
          />
        </div>
      )}
    </section>
  );
};

export default PublishedCampaigns;
