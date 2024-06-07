"use client";
import { selectCurrentUser } from "@/store/slices/user/userSlice";
import { useSelector } from "react-redux";
import { useGetKYCInfoQuery } from "@/store/services/kyc/api";
import StatusTag from "@/components/statusTag/index";
import { useTranslation } from "react-i18next";
import { KYCStatusEnum } from "@/types/enum.constants";
import KYCForm from "@/components/KYCForm/index";


const Verification = () => {
  const {t} = useTranslation("accountPage");
  const user = useSelector(selectCurrentUser) as IUserState;
  const {data : kycResp } = useGetKYCInfoQuery();
  const KYCInfo = kycResp?.result;
  return (
    <div className="flex flex-col">
      <div className="flex sm:px-5 py-5 border-b justify-between items-center">
        <div>
          <h2 className="text-[20px] font-minion">
            {t("personalIdVerificationPage.title")}
          </h2>
          <p className="text-[#BFC5D5] text-[12px] tracking-[0]">
            {t("personalIdVerificationPage.content")}
          </p>
        </div>
        {user?.kycStatus === KYCStatusEnum.VERIFIED ? (
          <StatusTag text={user?.kycStatus} color="green" />
        ) : null}
      </div>
      {user?.kycStatus === KYCStatusEnum.VERIFIED && KYCInfo ? (
        <KYCForm KYCInfo={KYCInfo} />
      ) : null}
      <p className="text-[#BFC5D5] text-[12px] tracking-[0] sm:mx-[40px] sm:px-[20px] py-[20px] border-t">
        {t("KYCVerificationContent")}{" "}
        <span className="font-bold pl-1 text-[#BFC5D5]">
          {t("privacyPolicy")}
        </span>
      </p>
    </div>
  );
};

export default Verification;