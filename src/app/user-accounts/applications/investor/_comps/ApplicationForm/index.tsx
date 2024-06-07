import React from "react";

// import BackgroundForm from "?./BackgroundForm";
import RiskAssessmentForm from "./RiskAssessmentForm";
import { IApplicationFormProps } from "./type";
import IdentityForm from "@/app/user-accounts/_comps/Forms/IdentityForm";
import KYCForm from "@/app/user-accounts/_comps/Forms/KYCForm";
import ResidentialAddressForm from "@/app/user-accounts/_comps/Forms/ResidentialForm";
import FundForm from "@/app/user-accounts/_comps/Forms/FundForm";
import WealthForm from "@/app/user-accounts/_comps/Forms/WealthForm";
import BackgroundForm from "./BackgroundForm";
import KycProfile from "@/components/KycProfile";

const ApplicationForm = ({ investorDetails }: IApplicationFormProps) => {
  console.log(investorDetails);

  return (
    <div className="flex flex-col gap-4 col-start-1 md:col-end-4">
      <IdentityForm data={investorDetails?.identity} />
      <KYCForm data={investorDetails?.kycStatus} />
      {investorDetails && <KycProfile />}
      <ResidentialAddressForm
        data={investorDetails?.residentialAddress}
        investorId={investorDetails?.other?.investorId}
      />
      <FundForm
        data={investorDetails?.fundSource}
        investorId={investorDetails?.other?.investorId}
      />
      <WealthForm
        data={investorDetails?.wealthSource}
        investorId={investorDetails?.other?.investorId}
      />
      <BackgroundForm
        data={investorDetails?.investorBackground}
        investorId={investorDetails?.other?.investorId}
      />
      <RiskAssessmentForm />
    </div>
  );
};

export default ApplicationForm;
