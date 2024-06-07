"use client";
import Button from "@/components/button";
import GeneralModal from "@/components/generalModal";
import { ArrowRight } from "@/utils/icons/index";
import { useCreateCampaignMutation } from "@/store/services/campaign/campaignDetailsApi";
import { TextInput } from "@/components/TextInputs";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const CampaignModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation("campaignsPage");
  const [assetName, setAssetName] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const [createCampaign, { data, isSuccess }] = useCreateCampaignMutation();

  useEffect(()=> {
    if (isSuccess && data){
      router.push(pathname + '/detail?id=' + data?.data.campaignId)
    }
  }, [isSuccess, router, pathname, data]);

  return (
    <GeneralModal isOpen={isOpen} onClose={onClose} className="w-[500px] shadow-lg  relative">

        <span className=" flex bg-[#FF6C02] h-[1px] w-3 absolute bottom-auto right-auto left-[20px] my-[10px] top-[-10px]" />
        <div className="flex justify-end absolute top-4 right-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-[#FFFFFF] text-[18px] font-minion mb-[5px]">
            {t("getStarted")}
          </h2>
          <p className="text-[#BFC5D5] text-[12px] tracking-[0px] ">
            {t("content")}
          </p>

          <div>
            <label className="font-semibold text-[10px] text-[#93A0C3] tracking-[1.5px] inline-block p-2 mb-1">
              {t("propertyName")}
            </label>

            <TextInput
              placeholder={t("placeholder")}
              className="text-[18px] font-minion"
              value={assetName}
              onChange={(evt) => setAssetName(evt.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button color="#5A6A93" onClick={onClose} className="py-3 px-8">
            {t("cancel")}
          </Button>
          <Button
            color="#FF6C02"
            className="grow justify-between tracking-[1.5px] uppercase"
            onClick={() => assetName && createCampaign({ assetName })}
          >
            {t("createCampaignTitle")}
            <ArrowRight size={20} />
          </Button>
        </div>
    </GeneralModal>
  );
};

export default CampaignModal;
