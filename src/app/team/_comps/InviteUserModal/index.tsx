"use client";
import Button from "@/components/button";
import GeneralModal from "@/components/generalModal";
import { useInviteCampaignManagerMutation } from "@/store/services/seller/teamApi";
import { TextInput } from "@/components/TextInputs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "@/utils/icons/index";


const InviteUserModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation("teamPage");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [inviteCampaignManager, { data, isSuccess }] = useInviteCampaignManagerMutation();

  useEffect(()=> {
    if (isSuccess && data){
      console.log('success')
    }
  }, [isSuccess, data]);

  return (
    <GeneralModal isOpen={isOpen} onClose={onClose}>
      <>
        <span className=" flex bg-[#FF6C02] h-[1px] w-3 bottom-auto right-auto left-[20px] my-[10px] absolute top-[-10px]"></span>
        <div className="flex justify-end absolute top-4 right-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
           <X size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-[#FFFFFF] text-[18px] font-minion mb-[5px]">
            {t("inviteUser")}
          </h2>
          <p className="text-[#BFC5D5] text-[12px] tracking-[0px] ">
            {t("content")}
          </p>

          <div>
            <label className="font-semibold text-[10px] text-[#93A0C3] tracking-[1.5px] inline-block p-2 mb-1">
              {t("fullName")}
            </label>

            <TextInput
              placeholder={t("fullNamePlaceholder")}
              className="text-[18px] font-minion"
              value={fullName}
              onChange={(evt) => setFullName(evt.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold text-[10px] text-[#93A0C3] tracking-[1.5px] inline-block p-2 mb-1">
              {t("email")}
            </label>

            <TextInput
              placeholder={t("emailPlaceholder")}
              className="text-[18px] font-minion"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button color="#5A6A93" onClick={onClose} className="py-3 px-8 ">
            {t("cancel")}
          </Button>
          <Button
            color="#FF6C02"
            className="grow  tracking-[1.5px] uppercase"
            onClick={() => fullName && email && inviteCampaignManager({ fullName , email })}
          >
            {t("invite")}
          
          </Button>
        </div>
      </>
    </GeneralModal>
  );
};

export default InviteUserModal;
