"use client";

import { useSearchParams } from "next/navigation";

import useGetInvestorDetails from "@/hooks/services/investor/getInvestorDetails";
import IdentityForm from "@/app/user-accounts/_comps/Forms/IdentityForm";
import ResidentialAddressForm from "@/app/user-accounts/_comps/Forms/ResidentialForm";
import FundForm from "@/app/user-accounts/_comps/Forms/FundForm";
import WealthForm from "@/app/user-accounts/_comps/Forms/WealthForm";
import BackgroundForm from "./_comps/BackgroundForm";
import DocumentsForm from "./_comps/DocumentsForm";

const Profile = () => {
  const searchParams = useSearchParams();

  const { investorDetails } = useGetInvestorDetails(searchParams.get("id")!);

  return (
    <div className="flex flex-col gap-4 col-start-1 md:col-end-4 pb-[80px]">
      {investorDetails && (
        <>
          <IdentityForm data={investorDetails?.identity} />
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
          <DocumentsForm
            data={investorDetails?.otherDocuments}
            investorId={investorDetails?.other?.investorId}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
