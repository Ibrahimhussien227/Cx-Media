"use client";

import { ColumnDef } from "@tanstack/react-table";

import StatsCard from "@/components/StatsCard";
import CustomTable from "@/components/CustomTable";
import useGetCampaigns from "@/hooks/services/campaignAdmin/getListCampaigns";
import { STATUS } from "@/types/enum.constants";
import StatsSkeleton from "@/components/Skeleton/Stats";
import TableSkeleton from "@/components/Skeleton/Table";
import { STATUSOPTIONS, COLUMNS } from "./configs";

const Applications = () => {
  const { stats, structuredData, isLoading, error, tableCount } =
    useGetCampaigns({});

  const notApprovedCampaigns = structuredData?.data.filter((property) => {
    return property.property.reviewStatus !== STATUS.APPROVED_TO_PUBLISH;
  });

  // console.log(searchParams1.get("page"));

  if (error) {
    return <h1>Somthing Went Wrong!</h1>;
  }

  return (
    <section className="m-5">
      <div className="bg-white p-5 mb-3">
        <nav className="flex flex-col md:flex-row mb-2 gap-2">
          <h2 className="font-bold">Campaigns Applications</h2>
        </nav>
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <StatsSkeleton key={index} />
              ))
            : stats?.map(({ title, value, icon }) => (
                <StatsCard
                  key={`${title}${value}`}
                  title={title}
                  count={value ?? ""}
                  icon={icon}
                />
              ))}
        </div>
      </div>
      <div className="bg-white w-full overflow-x-scroll">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <CustomTable
            data={
              notApprovedCampaigns?.map((item) => ({
                _id: item.campaign._id,
                ...item,
              })) || []
            }
            statusOptions={(!error && STATUSOPTIONS) || []}
            columns={COLUMNS as ColumnDef<{ _id?: string }>[]}
            tableCount={tableCount}
          />
        )}
      </div>
    </section>
  );
};

export default Applications;
