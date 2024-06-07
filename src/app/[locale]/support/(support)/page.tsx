"use client";

import React from "react";
import { useFormStatus, useFormState } from "react-dom";
import CustomButton from "@/components/CustomButton";
import { createMessage } from "./actions";
import GeneralTextarea from "@/components/GeneralTextarea";
import GeneralInput from "@/components/GeneralInput";
import { FieldError } from "./_components/FieldError";
import { EMPTY_FORM_STATE } from "./utils";
import { useFormReset } from "@/hooks/useFormReset";

const CreateSupport = () => {
  const { pending } = useFormStatus();
  const [formState, formAction] = useFormState(createMessage, EMPTY_FORM_STATE);
  const formRef = useFormReset(formState);

  // const formRef = useFormReset(state);

  return (
    <form action={formAction} ref={formRef} className="flex flex-col w-[100%] ">
      <span className="font-bold">{formState.message}</span>

      <div className="flex justify-between items-center sm:px-[20px] pt-[5px] pb-[20px] border-b-[#D4E4F2] border-b-[1px]">
        <div className="flex flex-col">
          <h2 className=" text-[20px] font-MinionPro">
            Create a Support Ticket.
          </h2>
          <p className="text-secondary text-[12px] tracking-[0]">
            Send us a query and our support team will be in touch within 24-48
            hours.
          </p>
        </div>
        <div className="flex sm:pt-0 pt-5">
          <button className="bg-[#D4E4F2] text-secondary text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px] mr-3">
            CANCEL
          </button>
          <CustomButton
            disabled={pending}
            className="bg-[#FF6C02] text-white text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px]"
          >
            SUBMIT
          </CustomButton>
        </div>
      </div>
      <div className="flex flex-col w-[100%] sm:px-[20px] py-[20px]">
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
              <FieldError formState={formState} name="subject" />
            </div>
            <div className="lg:flex w-[40%] flex-col pl-[20px] hidden ">
              <p className="text-[#93A0C3] text-[12px] tracking-[0px] pl-[20px] border-l-[1px]">
                Enter a subject for your query so we can quickly identify the
                issue.
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
              <FieldError formState={formState} name="message" />
            </div>
            <div className="lg:flex w-[40%] flex-col pl-[20px] hidden ">
              <p className="text-[#93A0C3] text-[12px] tracking-[0px] pl-[20px] border-l-[1px]">
                Provide more details to help us understand your query. Max
                10,000 characters.
              </p>
            </div>
          </div>
        </div>{" "}
      </div>
    </form>
  );
};

export default CreateSupport;
