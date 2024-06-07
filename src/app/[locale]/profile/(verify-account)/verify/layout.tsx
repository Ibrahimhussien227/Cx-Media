import Link from "next/link";

import { ArrowLeft } from "@/utils/icons";
import StepperHeader from "./_components/StepperHeader";
import { createProfile, getInvestor } from "@/utils/api/InvestorApi";
import { revalidatePath, revalidateTag } from "next/cache";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const investorData = await getInvestor();

  if (investorData?.length === 0) {
    await createProfile().then(() => {
      revalidateTag("investor-data");
      revalidatePath("/profile/verify");
    });
  }

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="flex w-full h-[70px] border-b-[1px] flex-row items-center justify-start">
        <Link
          href="/profile"
          className="flex flex-row w-fit items-center justify-start h-full text-[10px] font-bold ]  px-10"
        >
          <div className="flex flex-row items-center justify-start gap-2 tracking-[0px]">
            <ArrowLeft size={20} />
            <p className="text-secondary font-bold uppercase">MY ACCOUNT</p>
            <p className="mr-2 ml-2 text-secondary">|</p>
            <p className=" text-[10px]">INVESTOR ACCOUNT VERIFICATION</p>
          </div>
        </Link>
      </div>
      <div className="px-7">
        {/* header */}
        <div className="flex flex-col px-[20px] pt-[10px] pb-[20px] mt-5 border-b-[#D4E4F2] border-b-[1px]">
          <h2 className=" text-[20px] font-MinionPro">Verify your Account.</h2>
          <p className="text-secondary text-[12px] tracking-[0]">
            Please complete the steps to get verified as an investor.
          </p>
        </div>

        <StepperHeader
          kycStatus={investorData?.kycStatus}
          profileCompletionStatus={investorData?.profileCompletionStatus}
          applicationStatus={investorData?.applicationStatus}
        />
        <main className="w-full h-screen">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
