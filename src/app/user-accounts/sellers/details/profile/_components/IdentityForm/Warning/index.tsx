import { WarningCircle } from "@/utils/icons";
import React from "react";

interface WarnningProps {
  header?: string;
  description?: string;
  className?: string;
  helperDiv?: boolean;
}

const Warning = ({
  header,
  description,
  className,
  helperDiv,
}: WarnningProps) => {
  return (
    <>
      <div className="w-full md:w-fit mb-2 bg-[#fff7e2] p-2">
        <div className="flex flex-row md:w-full">
          {helperDiv && <div className="w-[0px] md:w-[53%]"></div>}
          <div
            className={`flex flex-row alert-span py-1 ${
              helperDiv ? "my-2 w-[100%] md:w-[47%]" : "w-full"
            }`}
          >
            <div className="alert-img px-2">
              <WarningCircle size={22} color="#BF8C00" />
            </div>
            <div className="alert-info">
              <h3>{header}</h3>
              <p className={className}>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Warning;
