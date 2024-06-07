import StatusText from "@/components/StatusText";
import AddDocSection from "./_comps/AddDocSection";
import { getInvestor } from "@/utils/api/InvestorApi";
import { formateDate } from "@/utils/formateDate";
import { INVESTOR_APPLICATION_STATUS } from "@/types/enum.constants";

const Review = async () => {
  const investorDetails = await getInvestor();
  // INVESTOR_APPLICATION_STATUS.ACTION_REQUIRED,

  const activeDocuments =
    [
      INVESTOR_APPLICATION_STATUS.UNDER_REVIEW,
      INVESTOR_APPLICATION_STATUS.VERIFIED,
      INVESTOR_APPLICATION_STATUS.PENDING,
    ].includes(investorDetails?.applicationStatus) &&
    investorDetails?.otherDocuments;

  const actionRequired = INVESTOR_APPLICATION_STATUS.ACTION_REQUIRED.includes(
    investorDetails?.applicationStatus
  );

  return (
    <div className="relative px-7 w-full h-full">
      <div className="flex flex-row items-center justify-between w-full mt-5 border-b-[#D4E4F2] border-b-[1px]">
        <div className="flex flex-col px-[20px] pt-[10px] pb-[20px] ">
          <h2 className=" text-[20px] font-MinionPro">Application Review</h2>
          <p className="text-secondary text-[12px] tracking-[0]">
            Submit your application for review. You should get a notification
            within 24-72 hours.
          </p>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col items-end mr-4">
            <StatusText text={investorDetails?.applicationStatus} />
            <p className="text-secondary text-[12px] tracking-[0] py-1">
              Updated at{" "}
              {formateDate(investorDetails?.applicationUpdateTimestamp)}
            </p>
          </div>

          {/* BUTTON SHADOW (DON'T DELETE) */}
          <div className="bg-[black] opacity-0 text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px]">
            SUBMIT
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-10 pt-7 h-full overflow-hidden">
        {/* 1 */}
        {(activeDocuments || actionRequired) && (
          <div className="flex flex-col w-[270px] p-[10px] rounded-[2px] relative text-[#2C3A5C] cursor-pointer">
            <div className="text-[#2C3A5C] text-[13px] font-bold">
              Additional Documents Required
            </div>
            <p className="text-secondary text-[12px] tracking-[0] pt-2">
              {investorDetails.profileRejectionReason}
            </p>
          </div>
        )}
        {/* 2 */}
        <div className="w-full flex flex-row mt-5 gap-5 overflow-y-scroll no-scrollbar">
          {/* 2.1 */}
          {(activeDocuments || actionRequired) && (
            <div className="w-[20%] text-[13px] text-secondary font-semibold tracking-[1.5px]">
              OTHER DOCUMENTS
            </div>
          )}

          {/* 2.2 */}
          <AddDocSection
            actionRequiredStatus={actionRequired}
            activeDocuments={activeDocuments}
            investorDetails={investorDetails}
          />
          {/* 2.3 */}
          {(activeDocuments || actionRequired) && (
            <p className="w-[35%] text-[#93A0C3] text-[12px] tracking-[0px] border-l py-1 pl-4">
              Upload the additional documents requested to complete your
              application review.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
