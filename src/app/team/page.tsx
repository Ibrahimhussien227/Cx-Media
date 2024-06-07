"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/button";
import { Plus } from "@/utils/icons/index";
import InviteUserModal from "./_comps/InviteUserModal";
import { useGetCampaignManagersQuery } from "@/store/services/seller/teamApi";

import CustomTable from "@/components/CustomTable";
import { tableColumns } from "./config";
import { CampaignManagerTr } from "./_comps";

const TeamPage = () => {
  const { t } = useTranslation("teamPage");
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: campaignManager, isLoading } = useGetCampaignManagersQuery();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <header className="sm:px-10 px-5 py-5 flex items-center border-b-[1px] justify-between">
        <h1 className="text-[20px]">{t("title")}</h1>
        <Button onClick={openModal} color="#FF6C02" className="uppercase">
          {t("inviteUser")}
          <Plus size={14} className="ml-[10px]" />
        </Button>

        <InviteUserModal onClose={closeModal} isOpen={isModalOpen} />
      </header>

      <div className="py-5 sm:px-10 px-5 ">
        {campaignManager?.data.length ? (
          <CustomTable<ICampaignManager>
            columns={tableColumns}
            data={campaignManager.data}
          >
            {(row: ICampaignManager) => {
              const TrComp = CampaignManagerTr;
              return <TrComp data={row} />;
            }}
          </CustomTable>
        ) : (
          <div className="h-[80vh] max-w-64 m-auto flex flex-col items-center gap-5 text-center justify-center">
            <h2
              className={`text-lg font-minion leading-8 p-2 relative after:block after:w-8 after:h-[1px] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-orange after:rounded-sm`}
            >
              {t("addTeamMembers")}
            </h2>
            <p className="text-[#BFC5D5] text-[12px] text-sm leading-4 tracking-normal">
              {t("teamContent")}
            </p>
            <Button
              onClick={openModal}
              color="#FF6C02"
              className="w-full uppercase"
            >
              {t("inviteUser")}
              <Plus size={14} className="ml-[10px]" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default TeamPage;
