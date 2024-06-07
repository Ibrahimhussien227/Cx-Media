import React from "react";

import AnnualInvestmentCap from "./_components/AnnualInvestmentCap/index";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-[100%] sm:pl-5 flex-col h-full overflow-hidden">
      <AnnualInvestmentCap />
      {children}
    </div>
  );
};

export default Layout;
