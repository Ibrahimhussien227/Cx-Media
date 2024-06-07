import GeneralCheckbox from "@/components/GeneralCheckbox";
import CheckGroup from "./CheckBoxGroup";
import ImagesUploadWrapper from "./FileUploadWrapper";

const ApplicationForm = () => {
  return (
    <div className="flex flex-col justify-center gap-y-4 w-full">
      {/* 1 */}
      <div className="flex flex-col mb-[20px] border-b-[1px] pb-5 gap-4">
        <p className="text-secondary text-[10px] font-bold">1. NET ASSETS</p>
        <label className="text-secondary text-[12px]">
          Do you have Net. Assets amounting to at least US$1 million?
        </label>
        <CheckGroup />
        <label className="text-secondary text-[12px]">
          Please upload one or more documents demonstrating your net assets’
          value. These documents must not be older than 6 months.
        </label>
        <ImagesUploadWrapper />
      </div>
      {/* 2 */}
      <div className="flex flex-col mb-[20px] border-b-[1px] pb-5 gap-5">
        <p className="text-secondary text-[10px] font-bold">
          2. UNDERSTANDING OF FINANCIAL MARKETS
        </p>
        <label className="text-secondary text-[12px]">
          Do you possess sufficient experience and understanding of financial
          markets, products, transactions, and associated risks?
        </label>
        <CheckGroup />
      </div>
      {/* 3 */}
      <div className="flex flex-col mb-[20px] border-b-[1px] pb-5 gap-5">
        <p className="text-secondary text-[10px] font-bold">
          3. INVESTMENT EXPERIENCE
        </p>
        <label className="text-secondary text-[12px]">
          Have you invested in Stocks and/or Bonds in the past?
        </label>
        <CheckGroup />
        <label className="text-secondary text-[12px]">
          Have you invested in Real Estate in the past?
        </label>
        <CheckGroup />
        <label className="text-secondary text-[12px]">
          Have you invested directly or in indirectly in any enterprise in the
          past?
        </label>
        <CheckGroup />
        <p className="text-secondary text-[12px] tracking-[0px]">
          Please upload one or more documents demonstrating your knowledge and
          experience investing in these assets. The documents could include
          investment statements, records, resumes (if relevant experiance is
          practical), or other relevant documentation.
        </p>
        <ImagesUploadWrapper />
      </div>
      <div className="flex flex-row pb-[10px]">
        <GeneralCheckbox
          label="I attest that all details provided are accurateand true to the best of
          my knowledge."
        />
      </div>
    </div>
  );
};

export default ApplicationForm;
