"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import StatsCard from "@/components/StatsCard";
import CustomTable from "@/components/CustomTable";
import CustomButton from "@/components/CustomButton";

import StatsSkeleton from "@/components/Skeleton/Stats";
import { Plus } from "@/utils/icons";
import { useGetAdmins } from "@/hooks/services/admin/useGetAdmins";
import CreateModal from "./_components/Modals/CreateModal";
import { COULUMNS, STATUSOPTIONS } from "./configs";
import SuccessModal from "@/components/Modal/SuccessModal";
import TableSkeleton from "@/components/Skeleton/Table";

const Adminstrators = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const { allAdmin, adminStats, error, isLoading } = useGetAdmins();

  return (
    <section className="m-5">
      {isCreateModalOpen && (
        <CreateModal
          setModalOpen={setIsCreateModalOpen}
          setIsSuccessModalOpen={setIsSuccessModalOpen}
        />
      )}
      {isSuccessModalOpen && (
        <SuccessModal
          setModalOpen={setIsSuccessModalOpen}
          description="User Invited Successfully."
        />
      )}
      <div className="bg-white p-5 mb-3">
        <div className="flex items-center mb-2 gap-2">
          <h2 className="font-bold">Administrators</h2>

          <CustomButton
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-primary flex flex-row items-center justify-center gap-2 text-white py-1 px-2 rounded-sm"
          >
            <Plus size={16} />
            <p className="font-bold text-[14px]">Add new</p>
          </CustomButton>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full">
          {/* {!isLoadingStats
            ? adminStats?.map(({ title, value, icon }) => (
                <StatsCard key={title} title={title} count={value} />
              ))
            : ""} */}

          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <StatsSkeleton key={index} />
              ))
            : adminStats?.map(({ title, value, icon }) => (
                <StatsCard
                  key={`${title}${value}`}
                  title={title}
                  count={value ?? ""}
                  icon={icon}
                />
              ))}
        </div>
      </div>
      <div className="bg-white pt-5 w-full overflow-x-scroll">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <div className="bg-white w-full overflow-x-scroll">
            <CustomTable
              data={
                (!error &&
                  allAdmin?.data.map((item) => ({
                    _id: item.userId,
                    ...item,
                  }))) ||
                []
              }
              columns={COULUMNS as ColumnDef<{ _id?: string }>[]}
              statusOptions={(!error && STATUSOPTIONS) || {}}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Adminstrators;
