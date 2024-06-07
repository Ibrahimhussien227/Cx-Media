"use client";
import Button from "@/components/button";
import { useState } from "react";
import { KYCStatusEnum } from "@/types/enum.constants";
import GeneralModal from "@/components/generalModal/index";
import StatusTag from "@/components/statusTag/index";
import { useTranslation } from "react-i18next";
import { ISetupSectionProps } from "../../@business/types";
import { KYCApi, useGetKYCInfoQuery, useLazyGetShuftiProTokenQuery } from "@/store/services/kyc/api";
import { SellerProfileApi } from "@/store/services/seller/profileApi";
import KYCForm from "@/components/KYCForm";
import { useAppDispatch } from "@/store/hooks";


const PersonalIdentityVerification =({user, activeTabState}:ISetupSectionProps)=>{
  const {t} = useTranslation("accountPage");

  const {activeTabIdx, setActiveTabIdx} = activeTabState;

  const [isModalOpen, setModalOpen] = useState(false);
  const [identitySubmitted, setIdentitySubmitted] = useState(false);

  const dispatch = useAppDispatch();

  const [getShuftiProToken, {isLoading: isLoadingToken, data: tokenResp}] = useLazyGetShuftiProTokenQuery();
  const {data : kycResp, isLoading } = useGetKYCInfoQuery();

  const closeModal = () => {
    setModalOpen(false);
  };

  const startVerification =()=> {
    getShuftiProToken();
    window.navigator.mediaDevices.getUserMedia({video: true})
  }
  const shuftiProUrl = tokenResp?.result.verification_url;
  const KYCInfo = kycResp?.result;

  const handleBtnClick =()=>{
    if ((!shuftiProUrl &&  !KYCInfo?.iframeData) || [KYCStatusEnum.REJECTED, KYCStatusEnum.INVALID].includes(KYCInfo?.kycStatus)) {
      startVerification()
    } else { //verification process is done, refresh to get the latest data
      dispatch(KYCApi.util.invalidateTags(["KYC"]));
      dispatch(SellerProfileApi.util.invalidateTags(["Profile"]))
    }
  }


  return (
    <>
      <div className="flex sm:px-3 py-3 border-b justify-between items-center">
        <div>
          <h2 className="text-[20px] font-minion">
          {t("personalIdVerificationPage.title")}
          </h2>
          <p className="text-[#BFC5D5] text-[12px] tracking-[0]">
          {t("personalIdVerificationPage.content")}
          </p>
        </div>
        {user?.kycStatus === KYCStatusEnum.VERIFIED? (   
          <StatusTag
            text={t(`personalIdVerificationPage.${user.kycStatus}`)}
            color='green'
          />   
        ):(
          <Button
            color="#FF6C02"
            className="self-center ml-auto"
            onClick={handleBtnClick}
            disabled={isLoadingToken || KYCInfo?.kycStatus === KYCStatusEnum.PENDING}
          >
            {shuftiProUrl || KYCInfo?.iframeData?
              "Refresh" : t("verifyNow")
            }
          </Button>
        )}
      </div>
      {user?.kycStatus === KYCStatusEnum.VERIFIED &&  KYCInfo? (
          isLoading ? <div>Loading...</div> : <KYCForm KYCInfo={KYCInfo}/>
        ): shuftiProUrl || KYCInfo?.iframeData? (
          <iframe
            src={shuftiProUrl || KYCInfo?.iframeData.verification_url}
            title="Open identification process"
            height={650}
            width="100%"
            allow={`camera ${shuftiProUrl || KYCInfo?.iframeData.verification_url}`}
          />
        ):null
      }
      {identitySubmitted? ( 
        <GeneralModal isOpen={isModalOpen} onClose={closeModal} >
        <div  className='flex justify-center items-center flex-col p-[0]'>
          <h2 className={`relative font-minion text-[18px] pb-[10px] after:block after:w-8 after:h-[1px] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-orange after:rounded-sm`}>
            {t("modalDetail.verificationSuccessful")}
          </h2>
          <p className='text-[#BFC5D5] pt-[10px] text-[12px] tracking-[0px] text-center'>
            {t("modalDetail.identityVerificationsuccessful")}
          </p>
        </div>
        <div className='flex flex-col px-[0] pt-[20px] pb-[10px]'>
          <Button color="#FF6C02" onClick={() => setActiveTabIdx(activeTabIdx+1)}>
          {t("modalDetail.proceedPay")}
          </Button>
          
          <Button color="#5A6A93" className="mt-2" onClick={closeModal}>
            {t("modalDetail.savePayLater")} 
          </Button>
        </div> 
       </GeneralModal>
      ): null}
    </>
  );
}

export default PersonalIdentityVerification;