"use client";
import { formatDate } from "@/utils/formatDate";
import { useState } from "react";
import CustomTable from "@/components/CustomTable";
import { tableColumns } from "./config";
import { useGetUserPaymentHistoryQuery } from "@/store/services/payment/api";
import { CaretRight } from "@/utils/icons/index";
import GeneralModal from "@/components/generalModal/index";
import Button from "@/components/button/index";

const Payment = () => {
  const { data: payment, isLoading } = useGetUserPaymentHistoryQuery();
  const [selectedRow, setSelectedRow] = useState<IPaymentTransaction>({});
  const [isModalOpen, setModalOpen] = useState(false);
  const handleRowClick = (row: any) => {
    console.log(row);
    const newSelectedRow: IPaymentTransaction = {
      txID: row.paymentStatusId,
      transactionPurpose: row.paymentSessionType,
      amount: row.amount,
      paymentMethod:
        row?.statusResponsePayload?.order?.card?.type +
        row?.statusResponsePayload?.order?.card?.last4,
      timeStamp: row.createdAt,
    };
    setSelectedRow(newSelectedRow);
    setModalOpen(true);
    console.log(newSelectedRow);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className=" w-full">
      <div className="flex flex-col border-b p-4 mb-[10px]">
        <h2 className="text-[#FFFFFF] text-[20px] font-minion">Payments</h2>
        <p className="text-[#BFC5D5] text-[12px] tracking-[0]">
          View all payments made for your account.
        </p>
      </div>
      <div className="px-4">
        {isLoading ? 
          <p>Loading...</p>
          :
          payment?.data && payment.data.length > 0 ? (
          <CustomTable<IPaymentTransaction>
            columns={tableColumns}
            data={payment.data.flat()}
          >
            {(row: any) => (
              <tr
                key={row.paymentStatusId}
                onClick={() => handleRowClick(row)}
                className="cursor-pointer relative after:block after:w-4 after:absolute after:top-0 after:left-20 after:bg-orange group hover:bg-[#5A6A93] hover:after:h-[1px] transition-all"
              >
                <td className="p-4">
                  <span className=" font-minion text-[16px]">
                    {row.paymentStatusId}
                  </span>
                </td>
                <td className="text-center p-4 ">
                  <span className="font-minion text-[16px]">
                    {row.paymentSessionType}
                  </span>
                </td>
                <td className="text-center p-4 ">
                  <span className="font-minion text-[16px]">{row.amount}</span>
                </td>
                <td className="text-center p-4 ">
                  <span className="font-minion text-[16px]">
                    {row.statusResponsePayload?.order?.card?.type}{" "}
                    {row.statusResponsePayload?.order?.card?.last4}
                  </span>
                </td>
                <td className="p-4 ">
                  <span className="font-minion text-[16px]">
                    {row.createdAt
                      ? formatDate(row.createdAt, ", ", ["t", "d", "m", "y"])
                      : ""}
                  </span>
                  <span className="bg-orange p-2 rounded-[50%] cursor-pointer absolute -right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                    <CaretRight color="white" />
                  </span>
                </td>
              </tr>
            )}
          </CustomTable>
        ) : (
          <div className="min-h-[400px] grid place-items-center content-center gap-3 lg:min-h-[700px">
            <p className="text-[12px] font-extralight tracking-normal">
              Data not found
            </p>
          </div>
        )}
      </div>
      {selectedRow && (
        <GeneralModal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex flex-col p-[0]">
            <h2 className="text-[#FFFFFF] text-[10px] tracking-[1.5px] font-bold">
              TRANSACTION PURPOSE/TYPE
            </h2>
            <p className="text-[#BFC5D5] text-[20px] tracking-[0px] font-minion">
              {selectedRow.amount}{" "}
              <span className="text-[#93A0C3] text-[12px]">AED</span>
            </p>
            <p className="text-[#BFC5D5] text-[12px] tracking-[0px] font-bold">
              {selectedRow.timeStamp
                ? formatDate(selectedRow.timeStamp, ", ", ["t", "d", "m", "y"])
                : ""}{" "}
            </p>
            <div className="flex flex-col py-2 border-b border-[#2C3A5C]">
              <div className="flex justify-between py-1">
                <span className="text-[#BFC5D5] text-[12px] pr-1">
                  Base Value
                </span>
                <hr className="shrink-0 grow border-dotted self-center" />
                <span className="text-[#FFFFFF] text-[12px] font-bold pl-1">
                  650.00 AED
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#BFC5D5] text-[12px] pr-1">
                  Platform Fee
                </span>
                <hr className="shrink-0 grow border-dotted self-center" />
                <span className="text-[#FF5A5A] text-[12px] font-bold pl-1">
                  (35.00) AED
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#BFC5D5] text-[12px] pr-1">Taxes</span>
                <hr className="shrink-0 grow border-dotted self-center" />
                <span className="text-[#FF5A5A] text-[12px] font-bold pl-1">
                  (1.75) AED
                </span>
              </div>
            </div>
            <div className="flex flex-col py-2 border-b border-[#2C3A5C]">
              <div className="flex flex-col py-1">
                <span className="text-[#BFC5D5] text-[12px]">
                  Transaction ID
                </span>
                <span className="text-[#FFFFFF] text-[12px] font-bold">
                  {selectedRow.txID || "---"}
                </span>
              </div>
              <div className="flex flex-col py-1">
                <span className="text-[#BFC5D5] text-[12px]">
                  Payment Method
                </span>
                <span className="text-[#FFFFFF] text-[12px] font-bold">
                  {selectedRow.paymentMethod}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col  px-[0] pt-[20px]">
            <Button color="#FF6C02" className="grow tracking-[1.5px] uppercase">
              OK
            </Button>
            <Button color="#5A6A93" onClick={closeModal} className="mt-2">
              DOWNLOAD RECEIPT
            </Button>
          </div>
        </GeneralModal>
      )}
    </div>
  );
};

export default Payment;
