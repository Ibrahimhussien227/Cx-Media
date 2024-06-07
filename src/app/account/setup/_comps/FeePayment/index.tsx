"use client";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/button";
import StatusTag from "@/components/statusTag/index";
import { useSearchParams } from "next/navigation";
import GeneralModal from "@/components/generalModal/index";
import { useTranslation } from "react-i18next";
import { ISetupSectionProps } from "../../@business/types";
import { useCreateTelrSessionMutation } from "@/store/services/payment/api";
import { PaymentStatus, SellerTypeEnum, TelrSessionTypes } from "@/types/enum.constants";
import { useAppDispatch } from "@/store/hooks";
import { SellerProfileApi } from "@/store/services/seller/profileApi";

const FeePayment =({user}:ISetupSectionProps)=>{  
  const {t} = useTranslation("accountPage");
  const type = useSearchParams().get("type") as string;
  const [createTelrSession, {isLoading, data: telrSessionResp}] = useCreateTelrSessionMutation();
  const [isModalOpen, setModalOpen] = useState(false);
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
          if (evt.data === PaymentStatus.Paid){
            setModalOpen(true)
          }
        }
      }
    }
    window.addEventListener('message', handleOrderRefRequest)
    return ()=> window.removeEventListener('message', handleOrderRefRequest)
  }, [telrSessionResp?.data])


  const closeSuccessfulPaymentModal = () => {
    dispatch(SellerProfileApi.util.invalidateTags(["Profile"]))
    setModalOpen(false);
  };
  const initiatePayment =()=>{
    setIsPaymentModalOpen(true)
    if (!telrSessionResp?.data || isPaymentCancelled){
      const host = window.location.origin;
      createTelrSession({
        sessionType: TelrSessionTypes.KycPayment,
        callBackUrls: {
          authorised: host + `/sub-pages/payment-result`,
          declined: host + `/sub-pages/payment-result`,
          cancelled: host + `/sub-pages/payment-result`
        }
      })
    }
  }

  return (
    <div>
      <div className="flex sm:px-3 py-3 border-b justify-between items-center">
        <div>
          <h2 className="text-[20px] font-minion">
          {t("feePaymentPage.title")} {type == SellerTypeEnum.INDIVIDUAL ? "200" : "500"}.00
          </h2>
          <p className="text-[#BFC5D5] text-[12px] tracking-[0]">
          {t("feePaymentPage.content")}
          </p>
        </div>
        <div className="self-center ml-auto flex items-end flex-col">
          {/* user.isRegistrationFeePaid === false ? ( // which implies a payment failure.. for now
            <div>
              <StatusTag text="Failed" color="red" />
              <p className="text-[#BFC5D5] text-[12px] tracking-[0] mt-[5px]">
                Updated at {user.updateAt?.toDateString()}
              </p>
            </div>
          ) : null */}
          {user.isRegistrationFeePaid ? (
            <>
              <StatusTag text="Paid" color="green" />
              <p className="text-[#BFC5D5] text-[12px] tracking-[0] mt-[5px]">
                Updated at {user.updateAt?.toDateString()}
              </p>
            </>
          ) : (
            <Button
              color="#FF6C02"
              onClick={initiatePayment}
              disabled={isLoading}
            >
              {t("payNow")}
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

      <GeneralModal isOpen={isModalOpen} onClose={closeSuccessfulPaymentModal}>
        <div className="flex justify-center items-center flex-col p-[0]">
          <h2
            className={`relative font-minion text-[18px] pb-[10px] after:block after:w-8 after:h-[1px] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-orange after:rounded-sm`}
          >
              {t("feePaymentPage.modalTitle")}
          </h2>
          <p className="text-[#BFC5D5] pt-[10px] text-[12px] tracking-[0px] text-center">
              {t("feePaymentPage.modalDesc")}
          </p>
        </div>
        <div className="flex flex-col px-[0] pt-[20px] pb-[10px]">
          <Button
            color="#FF6C02"
            className="flex justify-center items-center h-[30px] w-[100%] px-[10px] text-[10px] font-bold tracking-[1.5px] rounded-[2px]"
            onClick={closeSuccessfulPaymentModal}
            to="/campaigns"
          >
            {t("feePaymentPage.modalBtn")}
          </Button>
        </div>
      </GeneralModal>
    </div>
  );
}

export default FeePayment;