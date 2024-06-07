"use client";
import React from "react";

import AccordionComponent from "@/components/Accordion";
import { useGetFaqQuery } from "../../../store/services/configuration/faqApi";

const BrowseFrequently = () => {
  const { data: faqData, isLoading } = useGetFaqQuery();
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-between items-start sm:px-5 pt-[5px] pb-5 border-b-[1px]">
        <h2 className=" text-[20px] font-minion">
          Frequently Asked Questions.
        </h2>
        <p className="text-[12px] tracking-[0]">
          The most frequently asked questions by users.
        </p>
      </div>
      <div className="flex flex-col w-full sm:px-5 py-5">
        <div className="flex flex-col">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {faqData && faqData.data ? (
                faqData.data.map((faqItem: IFaq) => (
                  <AccordionComponent
                    key={faqItem.faqId}
                    title={faqItem.question}
                    type={faqItem.faqId}
                  >
                    <div className="text-[14px] border-t-[0px] px-[0px] bg-[transparent]">
                      {faqItem.answer}
                    </div>
                  </AccordionComponent>
                ))
              ) : (
                <div>Data Not Found</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseFrequently;
