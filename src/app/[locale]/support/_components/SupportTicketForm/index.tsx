import GeneralInput from "@/components/GeneralInput";
import GeneralTextarea from "@/components/GeneralTextarea";

const SupportTicketForm = () => {
  return (
    <div className="flex flex-col justify-center gap-y-4 items-center w-full">
      <div className="flex w-full items-center">
        <div className="flex flex-col lg:w-[60%] w-[100%]">
          {" "}
          <GeneralInput
            name="subject"
            label="SUBJECT"
            placeholder="Enter Subject"
            type="text"
          />
        </div>
        <div className="lg:flex w-[40%] flex-col pl-[20px] hidden ">
          <p className="text-[#93A0C3] text-[12px] tracking-[0px] pl-[20px] border-l-[1px]">
            Enter a subject for your query so we can quickly identify the issue.
          </p>
        </div>
      </div>
      <div className="flex w-full items-center">
        <div className="flex flex-col lg:w-[60%] w-[100%]">
          <GeneralTextarea
            name="message"
            label="MESSAGE"
            placeholder="Enter Message"
          />
        </div>
        <div className="lg:flex w-[40%] flex-col pl-[20px] hidden ">
          <p className="text-[#93A0C3] text-[12px] tracking-[0px] pl-[20px] border-l-[1px]">
            Provide more details to help us understand your query. Max 10,000
            characters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketForm;
