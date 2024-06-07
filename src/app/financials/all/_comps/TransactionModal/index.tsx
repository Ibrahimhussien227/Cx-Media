import React from "react";

import { X } from "@/utils/icons";
import StatusTag from "@/components/StatusTag";
import TransactionTextType from "@/components/TransactionTextType";
import TextLinkDownload from "@/components/TextLinkDownload";

const TransactionModal = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"
        onClick={() => setShowModal(false)}
      />
      <div className="inline-block bg-white rounded-sm px-4 py-5 text-left shadow-xl transform transition-all align-middle w-[460px]">
        <div className="flex items-center tracking-[0px]">
          <div className="w-full flex flex-col items-center justify-center text-center gap-2 divide-y">
            <div className="w-full flex flex-row justify-between items-center text-center">
              <p className="text-[18px] font-minion mt-1 font-medium">
                Transaction BreakDown
              </p>
              <X
                onClick={() => setShowModal(false)}
                className="cursor-pointer"
              />
            </div>
            <div className="w-full py-2">
              <div className="w-full flex flex-row justify-between items-center">
                <p className="font-semibold text-[20px]">1,000.00 AED</p>
                <StatusTag text="COMPLETE" />
              </div>
              <div className="w-full flex flex-row justify-between items-center text-[12px] mt-2">
                <p className="font-medium">Transaction Purpose / Type</p>
                <p className="font-medium">11:22:32 | 20/12/2023</p>
              </div>
            </div>
            <div className="w-full py-2 flex flex-row items-center justify-between text-[12px]">
              <p className="font-medium">Base Value</p>
              <p className="font-medium">1,000.00 AED</p>
            </div>
            <div className="w-full py-2 flex flex-row items-center justify-between text-[12px]">
              <p className="font-medium">Platform Fee</p>
              <p className="font-medium">10.00 AED</p>
            </div>{" "}
            <div className="w-full py-2 flex flex-row items-center justify-between text-[12px]">
              <p className="font-medium">Transaction Fee</p>
              <p className="font-medium">10.75 AED</p>
            </div>{" "}
            <div className="w-full py-2 flex flex-row items-center justify-between text-[12px] font-medium">
              <p className="font-medium">Taxes</p>
              <p className="font-medium">2.90 AED</p>
            </div>
            <p className="text-[18px] font-minion font-medium w-full text-start py-2">
              Transaction Details
            </p>
            <div className="w-full py-2 flex flex-row items-center justify-between text-[12px] font-medium">
              <p className="font-medium">Transaction ID</p>
              <p className="font-medium">TXD-9845678</p>
            </div>
            <div className="w-full py-2 flex flex-row items-center justify-between text-[12px] font-medium">
              <p className="font-medium">Account ID</p>
              <p className="font-medium">CXM-1</p>
            </div>{" "}
            <div className="w-full py-2 flex flex-row items-center justify-between text-[12px] font-medium">
              <p className="font-medium">Transaction Type</p>
              <TransactionTextType text="Credit" />{" "}
            </div>{" "}
            <div className="w-full py-2 flex flex-row items-center justify-between text-[12px] font-medium">
              <p className="font-medium">Receipt Link</p>
              <TextLinkDownload href="" title="tx-134-receipt.pdf" />
            </div>{" "}
            <div className="w-full py-2 flex flex-row items-center justify-between text-[12px] font-medium">
              <p className="font-medium">Campaign ID</p>
              <p className="font-medium">APT-784-02-23-00001</p>
            </div>{" "}
            <div className="w-full py-2 flex flex-row items-center justify-between text-[12px] font-medium">
              <p className="font-medium">Property ID</p>
              <p className="font-medium">PID-784-02-23-00001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
