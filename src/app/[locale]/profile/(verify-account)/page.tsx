import React from "react";

import StatusText from "@/components/StatusText";
import { createProfile, getInvestor } from "@/utils/api/InvestorApi";
import { formateDate } from "@/utils/formateDate";
import RenderButton from "./verify/_components/RenderButton";
import { revalidatePath, revalidateTag } from "next/cache";

const AccountProfile = async () => {
  const data = await getInvestor();

  if (data?.length === 0) {
    await createProfile().then(() => {
      revalidateTag("investor-data");
      revalidatePath("/profile");
    });
  }

  return (
    <div className="flex flex-col w-[100%] pl-[20px]">
      {/* Section Header */}
      <div className="flex justify-between items-center sm:px-[20px] pt-[10px] pb-[20px] border-b-[#D4E4F2] border-b-[1px]">
        <div className="flex flex-col">
          <h2 className=" text-[20px] font-MinionPro">
            Investor Account Verification.
          </h2>
          <p className="text-secondary text-[12px] tracking-[0]">
            Keep your account up to date so you’re always ready to invest.
          </p>
        </div>

        <div className="flex sm:pt-0 pt-5">
          <div className="flex flex-col items-end mr-4">
            <StatusText text={data?.applicationStatus} />
            <p className="text-secondary text-[12px] tracking-[0] p-1">
              Updated at {formateDate(data?.applicationUpdateTimestamp)}
            </p>
          </div>

          {RenderButton(
            data?.applicationStatus,
            data?.kycStatus,
            data?.profileCompletionStatus
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
