"use client";
import React from "react";
import CopyButton from "@/components/CopyButton";
import { useGetContactQuery } from "../../../store/services/configuration/contactApi";


const ContactUs = () => {
  const { data: contactData } = useGetContactQuery();
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-between items-start sm:px-5 pt-[5px] pb-5 border-b-[1px]">
        <h2 className="text-[20px] font-minion">Contact Us.</h2>
        <p className="text-[12px] tracking-[0]">
          You can send us an email or call our support hotline using the details
          below.
        </p>
      </div>
      <div className="flex flex-col w-[100%] sm:px-[20px] py-[20px]">
      <div className="flex sm:w-[400px] justify-between sm:px-[20px] py-[10px] rounded-[2px] mb-[10px] cursor-pointer bg-gradient border-[#fffaf800]">
        <div className="flex flex-col justify-center">
          <h3 className="text-[10px] font-bold tracking-[1.5px]">
            EMAIL
          </h3>
          <p className=" text-[16px] tracking-[0px] font-minion">
            {contactData?.result.EMAIL}
          </p>
        </div>
        <CopyButton
          text={contactData?.result.EMAIL as string}
          color="#5A6A93"
        />
      </div>
      <div className="flex sm:w-[400px] justify-between sm:px-[20px] py-[10px] rounded-[2px] mb-[10px] cursor-pointer bg-gradient border-[#fffaf800]">
        <div className="flex flex-col justify-center">
          <h3 className="text-[10px] font-bold tracking-[1.5px]">
            SUPPORT HOTLINE
          </h3>
          <p className=" text-[16px] tracking-[0px] font-minion">
          {contactData?.result.HOTLINE}
          </p>
        </div>
        <CopyButton
          text={contactData?.result.HOTLINE as string}
          color="#5A6A93"
        />
      </div>
      </div>
    </div>
  );
};

export default ContactUs;
