import React from "react";

import AccordionComponent from "@/components/Accordion";
import { getFAQ } from "@/utils/api/configurationApi";

const BrowseFrequently = async () => {
  const faq = await getFAQ();

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-between items-start px-5 pt-[5px] pb-5 border-b-[1px]">
        <h2 className=" text-[20px] font-MinionPro">
          Frequently Asked Questions.
        </h2>
        <p className="text-secondary text-[12px] tracking-[0]">
          The most frequently asked questions by users.
        </p>
      </div>
      <div className="flex flex-col w-full px-5 py-5">
        <div className="flex flex-col">
          {faq.result.map(
            ({ question, answer }: { question: string; answer: string }) => (
              <AccordionComponent
                key={question}
                title={question}
                type="question"
              >
                <div className="text-secondary text-[14px] border-t-[0px] px-[0px] bg-[transparent]">
                  {answer}
                </div>
              </AccordionComponent>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseFrequently;
