import React from "react";

import AccordionComponent from "@/components/Accordion";
import StatusText from "@/components/StatusText";
import ApplicationForm from "./_components/ApplicationForm";

const UpgradeAccount = () => {
  return (
    <>
      <div className="flex justify-between items-center sm:px-[20px] pt-[10px] pb-[20px] border-b-[#D4E4F2] border-b-[1px]">
        <div className="flex flex-col">
          <h2 className=" text-[20px] font-MinionPro">
            Upgrade your investor account.
          </h2>
          <p className="text-secondary text-[12px] tracking-[0]">
            Please complete the application form and submit for review. All
            fields are mandatory.
          </p>
        </div>
        <div className="flex flex-col items-end">
          <StatusText text="APPROVED" />
          <p className="text-secondary text-[12px] tracking-[0]">
            Updated at 4:25 pm on 22 October, 2023
          </p>
        </div>
      </div>
      <AccordionComponent
        className="min-h-[300px] max-h-full mb-4"
        title="Application Form"
        statusText="COMPLETE"
      >
        <ApplicationForm />
      </AccordionComponent>
    </>
  );
};

export default UpgradeAccount;
