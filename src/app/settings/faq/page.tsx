"use client";

import React from "react";

import LandingFAQ from "./_components/LandingFAQ";
import InvestorFAQ from "./_components/InvestorFAQ";
import SellerFAQ from "./_components/SellerFAQ";

const FAQ = () => {
  return (
    <div className="col-start-1 md:col-end-4 flex flex-col gap-4 flex-shrink mb-[200px]">
      <LandingFAQ />
      <InvestorFAQ />
      <SellerFAQ />
    </div>
  );
};

export default FAQ;
