"use client";
import { useEffect, useState } from "react";
import { LabeledInput } from "@/components/TextInputs";
import Button from "@/components/button";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSupportTicketMutation } from "@/store/services/support/api";
import GeneralModal from "@/components/generalModal/index";

const CreateSupport = () => {
  const {t} = useTranslation("supportPage");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [supportTicket, {  isSuccess }] = useSupportTicketMutation();
  const [isModalSuccessOpen, setModalSuccessOpen] = useState(false); 
  const closeModal = () => {
    setModalSuccessOpen(false)
  };
  useEffect(() => {
    if (isSuccess) {     
      setModalSuccessOpen(true)
      setSubject("");
      setMessage("");
    }
  }, [isSuccess]);

  const isSubmitDisabled = !subject || !message;

  return (
    <div className="flex flex-col w-[100%] ">
      <div className="flex justify-between items-center sm:px-[20px] px-0 pt-[5px] pb-[20px] border-b-[#9fa7ad] border-b-[1px]">
        <div className="flex flex-col">
          <h2 className=" text-[20px] font-minion">
            {t("createTicket")}
          </h2>
          <p className="text-[12px] tracking-[0]">
            {t("createTicketDesc")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button color="#5A6A93">
            Cancel
          </Button>
          <Button color="#FF6C02" onClick={() => subject && message && supportTicket({ subject , message })} disabled={isSubmitDisabled}>
            SUBMIT
          </Button>
        </div>
      </div>
      <form className="flex flex-col w-[100%] sm:px-5 px-0 py-5 gap-5">
        <LabeledInput
          label="Subject"
          note="Enter a subject for your query so we can quickly identify the issue."
          placeholder="Enter Subject"
          onChange={(evt) => setSubject(evt.target.value)}
          value={subject}
        />
        <LabeledInput
          label="MESSAGE"
          note="Provide more details to help us understand your query. Max 10,000 characters."
          placeholder="Enter Message"
          onChange={(evt) => setMessage(evt.target.value)}
          value={message}
        />
      </form>
      <GeneralModal isOpen={isModalSuccessOpen} onClose={closeModal}>
        <div className="flex justify-center items-center flex-col p-[0]">
          <h2 className={`relative font-minion text-[18px] pb-[10px] after:block after:w-8 after:h-[1px] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-orange after:rounded-sm`}>
          {t("supportTicketSubmitted")}
          </h2>
          <p className="text-[#BFC5D5] pt-[10px] text-[12px] tracking-[0px] text-center">
          {t("supportTicketContent")}          </p>
        </div>
        <div className="flex  px-[0] pt-[20px] pb-[10px]">
        
          <Button color="#FF6C02" className="grow tracking-[1.5px] uppercase" onClick={closeModal}>
          OK
          </Button>
        </div>
      </GeneralModal>
    </div>
  );
};

export default CreateSupport;
