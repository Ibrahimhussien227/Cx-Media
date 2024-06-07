"use client";

import React, { useCallback, useState } from "react";

import ListItem from "../ListItem";
import FormSection from "../FormSection";
import { listItems } from "../../configs";
import { IWrapperFormProps } from "./type";

const WrapperForm = ({
  investorDetails,
  investorDropdown,
}: IWrapperFormProps) => {
  const [step, setStep] = useState(1);
  const [oldStatus, setOldStatus] = useState({
    residenceLen: 0,
    fundsLen: 0,
    wealthLen: 0,
    backgroundLen: 0,
  });
  const [value, setValue] = useState({
    residenceStatus: "PENDING",
    fundsStatus: "PENDING",
    wealthStatus: "PENDING",
    backgroundStatus: "PENDING",
  });

  const updateStatus = useCallback(
    (key: keyof typeof oldStatus, len: number, max: number) => {
      let status: "PENDING" | "INCOMPLETE" | "COMPLETE" = "PENDING";

      if (len > 0) {
        status = len === max ? "COMPLETE" : "INCOMPLETE";
      }

      const statusKey = `${key.replace("Len", "")}Status` as
        | "residenceStatus"
        | "fundsStatus"
        | "wealthStatus"
        | "backgroundStatus";

      // Avoid unnecessary state updates by checking if the new status is different
      setValue((prevValue) => {
        if (prevValue[statusKey] !== status) {
          return {
            ...prevValue,
            [statusKey]: status,
          };
        }
        return prevValue;
      });

      setOldStatus((prevState) => {
        if (prevState[key] !== len) {
          return {
            ...prevState,
            [key]: len,
          };
        }
        return prevState;
      });
    },
    [setValue, setOldStatus]
  );

  const statusHandler = useCallback(
    (
      residence: { residenceLen: number; max: number },
      funds: { fundsLen: number; max: number },
      wealth: { wealthLen: number; max: number },
      backgroundLen: number
    ) => {
      updateStatus("residenceLen", residence.residenceLen, residence.max);
      updateStatus("fundsLen", funds.fundsLen, funds.max);
      updateStatus("wealthLen", wealth.wealthLen, wealth.max);
      updateStatus("backgroundLen", backgroundLen, 3);
    },
    [updateStatus]
  );

  return (
    <>
      <div className="flex flex-col h-full">
        {listItems.map((item, index) => (
          <ListItem
            key={index}
            isActive={step === index + 1}
            onClick={() => setStep(index + 1)}
            title={item.title}
            statusText={
              value[item.statusKey as keyof typeof value] || "PENDING"
            }
          />
        ))}
      </div>
      <FormSection
        data={investorDetails}
        investorDropdown={investorDropdown}
        statusHandler={statusHandler}
        step={step}
      />
    </>
  );
};

export default WrapperForm;
