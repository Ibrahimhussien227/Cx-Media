"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import  { DownloadSimple, Info }  from "@/utils/icons";
import StatusTag from "@/components/statusTag";
import { statusColorMap, statusTextMap } from "./config";
import Button from "@/components/button";
import { useTranslation } from "react-i18next";
import { ICampaignSectionProps } from "../../types";
import { useCreateTelrSessionMutation } from "@/store/services/payment/api";
import { useAppDispatch } from "@/store/hooks";
import { campaignDetailsApi } from "@/store/services/campaign/campaignDetailsApi";
import GeneralModal from "@/components/generalModal/index";
import { CampaignReviewStatus, PaymentStatus, TelrSessionTypes } from "@/types/enum.constants";


const FeePayment = ({campaignDetails}:ICampaignSectionProps) => {

  const {t} = useTranslation("campaignsPage");
  const [createTelrSession, {isLoading, data: telrSessionResp}] = useCreateTelrSessionMutation();
  const [isPaymentCancelled, setIsPaymentCancelled] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const sessionFrameRef = useRef<HTMLIFrameElement>(null)
  const dispatch = useAppDispatch();
  useEffect(()=> {
    const handleOrderRefRequest =(evt : MessageEvent<string>)=>{
      if (typeof evt.data !== 'string') return;
  
      const host = window.location.origin;

      if (evt.data === "get_order_ref"){
        if (!(telrSessionResp?.data && sessionFrameRef.current)) return;

        sessionFrameRef.current.contentWindow?.postMessage(
          telrSessionResp?.data.order.ref,
          host + `/sub-pages/payment-result`
        )
      } else if (PaymentStatus[evt.data as keyof typeof PaymentStatus] !== null){//iframe sending status update
        if ([PaymentStatus.Cancelled, PaymentStatus.Declined].includes(evt.data as PaymentStatus)) {
          setIsPaymentCancelled(true);
        } else {  
          dispatch(
            campaignDetailsApi.util.invalidateTags([
              { type: "Campaign", id: "List" },
              { type: "Campaign", id: campaignDetails.campaignId },
            ])
          )
        }
      }
    }
    window.addEventListener('message', handleOrderRefRequest)
    return ()=> window.removeEventListener('message', handleOrderRefRequest)
  }, [campaignDetails.campaignId, dispatch, telrSessionResp?.data])


  const initiatePayment =()=>{
    setIsPaymentModalOpen(true)
    if (!telrSessionResp?.data || isPaymentCancelled){
      const host = window.location.origin;
      createTelrSession({
        campaignId:  campaignDetails.campaignId,
        sessionType: TelrSessionTypes.CampaignPayment,
        callBackUrls: {
          authorised: host + `/sub-pages/payment-result`,
          declined: host + `/sub-pages/payment-result`,
          cancelled: host + `/sub-pages/payment-result`
        }
      })
    }
  }

  return (
    <div className="flex flex-col w-[100%] px-[20px] ">
      <div className="flex flex-col w-[100%] border-b-[1px]">
        <div className="flex items-center py-[20px] justify-between gap-1">
          <div className="flex flex-col">
            <h2 className="text-[#FFFFFF] text-[20px] font-minion">
            {t("feePayment.title")}
            </h2>
            <p className="text-[#BFC5D5] text-[12px] tracking-[0]">
            {t("feePayment.content")}
            </p>
          </div>
          <div className="flex flex-col ml-auto items-end gap-2">
            {CampaignReviewStatus.APPROVED_TO_PUBLISH === campaignDetails.reviewStatus ? ( // TODO, consider payment reject/expiration status and display respective UI.. hit payment service
              <StatusTag
                text={statusTextMap["true"]}
                color={statusColorMap["true"]}
              />
            ): (
              <Button
                color="#FF6C02"
                onClick={initiatePayment}
                disabled={isLoading}
              >
                {campaignDetails.isFeePaid === undefined? "Pay" : "try again"} 
              </Button>
            )}
          </div>
        </div>
        <GeneralModal
          isOpen={Boolean(telrSessionResp?.data) && isPaymentModalOpen}
          onClose={()=> setIsPaymentModalOpen(false)}
          className="min-w-[390px] md:min-w-[650px]"
        >
        <iframe
          src={telrSessionResp?.data.order.url}
          title="start payment process"
          height={650}
          width="100%"
          ref={sessionFrameRef}
        />
      </GeneralModal>

      </div>
      <div className="flex w-[100%]  flex-col pt-[20px]">
        <p className="text-[#BFC5D5] text-[12px] tracking-[0px] flex items-center">
         
            <Info size='14' color='#ffffff'  className="mr-[5px]"/>
            {t("feePayment.info")}
          <Link
            href={""}
            className="text-[#FFFFFF] ml-[5px] text-[10px] tracking-[1.5px] font-bold flex"
          >
            {t("feePayment.downloadReceipt")}
          
           <DownloadSimple size='14' color='#ffffff'  className="ml-[5px]"/>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FeePayment;
