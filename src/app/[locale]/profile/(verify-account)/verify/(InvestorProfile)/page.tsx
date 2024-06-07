import { getInvestor } from "@/utils/api/InvestorApi";
import WrapperForm from "./_comps/WrapperForm";
import { getInvestorDropdown } from "@/utils/api/configurationApi";

const InvestorProfile = async () => {
  const investorDetails = await getInvestor();
  const investorDropdown = await getInvestorDropdown();

  if (investorDropdown.error)
    return <div>{investorDropdown.error.message}</div>;

  return (
    <div className="flex flex-row gap-10 pt-7 px-8 h-full">
      <WrapperForm
        investorDropdown={investorDropdown}
        investorDetails={investorDetails}
      />
    </div>
  );
};

export default InvestorProfile;
