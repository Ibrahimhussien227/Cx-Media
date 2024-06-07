

"use client";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import StatusTag from "@/components/statusTag/index";
import { ApplicationReviewStatus } from "@/types/enum.constants";
import GeneralModal from "@/components/generalModal/index";
import { useTranslation } from "react-i18next";
import { ISetupSectionProps } from "../../@business/types";
import { useSubmitProfileForReviewMutation } from "@/store/services/seller/profileApi";
import { formatDate } from "@/utils/formatDate";

const ApplicationReview =({user}:ISetupSectionProps)=>{
  const {t} = useTranslation("applicationReviewPage");

  const [submitForReview, {isSuccess}] = useSubmitProfileForReviewMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);

  useEffect(()=> {
    if (isSuccess){
      setModalOpen(true);
    }
  }, [isSuccess])

  return (
    <>
      <div className="flex gap-1 py-3 border-b justify-between items-center mt-2">
        <div>
          <h2 className="text-[20px] font-minion">
          {t("title")}
          </h2>
          <p className="text-[#BFC5D5] text-[12px] tracking-[0]">
          {t("content")}
          </p>
        </div>
        <div className="self-center flex">
          {[ApplicationReviewStatus.REJECTED, ApplicationReviewStatus.PENDING_REVIEW].includes(user.applicationReviewStatus) ? ( // which implies a payment failure.. for now
            <div className="text-end">
             
                <StatusTag
                  text={ApplicationReviewStatus.REJECTED === user.applicationReviewStatus? "REJECTED": "PENDING REVIEW"}
                  color={ApplicationReviewStatus.REJECTED === user.applicationReviewStatus? "red" : "yellow"}
                />{" "}
              
              <p className="text-[#BFC5D5] text-[11px] font-light tracking-tight mt-1">
                {user.lastUpdateTimestamp && `Updated At ${formatDate(user.lastUpdateTimestamp, ' ')}`}
              </p>
            </div>
          ) : null}
          {ApplicationReviewStatus.APPROVED === user.applicationReviewStatus? (
              <StatusTag
                text={ApplicationReviewStatus.APPROVED }
                color={"green"}
              />
           
          ) : ApplicationReviewStatus.PENDING_REVIEW !== user.applicationReviewStatus && (
            <Button color="#FF6C02" onClick={()=> submitForReview(user.sellerId as string)}>
             {t("submit")}
            </Button>
          )}
        </div>
      </div>
      <GeneralModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex justify-center items-center flex-col p-[0]">
          <h2
            className={`relative font-minion text-[18px] pb-[10px] after:block after:w-8 after:h-[1px] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-orange after:rounded-sm`}
          >
              {t("modalDetail.submittedTitle")}
          </h2>
          <p className="text-[#BFC5D5] pt-[10px] text-[12px] tracking-[0px] text-center">
              {t("modalDetail.applicationSubmitted")}
          </p>
        </div>
        <div className="flex flex-col px-[0] pt-[20px] pb-[10px]">
          <Button
            color="#FF6C02"
            className="flex justify-center items-center h-[30px] w-[100%] px-[10px] text-[10px] font-bold tracking-[1.5px] rounded-[2px]"
            onClick={closeModal}
          >
          {t("modalDetail.ok")}
          </Button>
        </div>
      </GeneralModal>
    </>
  );
}

export default ApplicationReview;