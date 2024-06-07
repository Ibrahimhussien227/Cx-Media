"use client";

import CampaignExtensionForms from "./_components/CampaignExtensionForm";
import CampaignInvestmentForms from "./_components/CampaignInvestmentForm";
import CampaignListingForms from "./_components/CamppaignListingForm";
import DepostiForms from "./_components/DepositForm";
import PropertySaleForms from "./_components/PropertySaleForm";
import RegistrationForms from "./_components/RegistrationForm";
import RentalForm from "./_components/RentalForm";
import ShareListingForms from "./_components/ShareListingForm";
import TransactionSettingsForm from "./_components/TransactionSettingsForm";
import IPlatFormWalletForm from "./_components/PlatformWalletForm";
import useGetPaymentManager from "@/hooks/services/configuration/getPaymanManager";
import { Spinner } from "@phosphor-icons/react";

const Settings = () => {
  const { managerData, isLoadingManagerData } = useGetPaymentManager();

  if (isLoadingManagerData) return <Spinner />;

  return (
    <div className="col-start-1 md:col-end-4 flex flex-col gap-4 h-full">
      <TransactionSettingsForm />
      <DepostiForms />
      <RegistrationForms />
      <CampaignListingForms />
      <CampaignInvestmentForms campaignInvestment={managerData || {}} />
      <CampaignExtensionForms />
      <RentalForm />
      <ShareListingForms />
      <PropertySaleForms />
      <IPlatFormWalletForm />
    </div>
  );
};

export default Settings;
