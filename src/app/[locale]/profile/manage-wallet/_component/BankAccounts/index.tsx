"use client";

import GeneralCheckbox from "@/components/GeneralCheckbox";
import { Bank, Trash, Wallet } from "@/utils/icons";
import CustomButton from "@/components/CustomButton";
import { useEffect, useState } from "react";
import GeneralModal from "@/components/Modal";
import { useLazyAsync } from "@/hooks/useAsync";
import { createCardSession, setPreferedMethod } from "./utils";
import { LeanFlowEndStatus } from "@/types/enum.constants";
import { IAccountsSectionProps } from "./type";

const BankAccounts = ({
  customerId,
  paymentMethods,
  revalidatePaymentMethods,
}: IAccountsSectionProps) => {
  const [openMethodModal, setOpenMethodModal] = useState(false);

  const [addCard, { data }, resetSession] = useLazyAsync(createCardSession);
  const [setPrefered, { data: hasPreferenceUpdated, isLoading }] =
    useLazyAsync(setPreferedMethod);

  useEffect(() => {
    if (hasPreferenceUpdated) {
      revalidatePaymentMethods();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPreferenceUpdated, isLoading]);

  useEffect(() => {
    const handleCardProcessUpdate = (evt: MessageEvent<string>) => {
      if (typeof evt.data !== "string") return;

      if (evt.data === "card-added") {
        setTimeout(() => {
          setOpenMethodModal(false);
          resetSession();
        }, 2000);
        revalidatePaymentMethods();
      } else if (
        evt.data === "card-cancelled" ||
        evt.data === "card-declined"
      ) {
        setTimeout(resetSession, 1500);
      }
    };

    window.addEventListener("message", handleCardProcessUpdate);
    return () => window.removeEventListener("message", handleCardProcessUpdate);
  }, [resetSession, revalidatePaymentMethods]);

  const createCustomer = () => {
    if (!customerId) {
      window.alert("Error: no custoemrID");
    }
    window.Lean.connect({
      app_token: process.env.NEXT_PUBLIC_LEAN_APP_TOKEN,
      permissions: [
        "identity",
        "accounts",
        "transactions",
        "balance",
        "payments",
      ],
      sandbox: true,
      customer_id: customerId,
      payment_destination: "f501d6df-18f1-4740-be8e-587d8c9d2fe2",
      callback: (respObj: { status: string }) => {
        if (respObj.status === LeanFlowEndStatus.SUCCESS) {
          revalidatePaymentMethods();
        }
      },
    });
  };

  return (
    <div className="flex flex-col pt-[30px] mt-[30px] gap-2 border-t-[1px] border-t-[#D4E4F2]">
      <p className=" text-[10px] font-bold">LINKED PAYMENT METHODS</p>
      <p className="text-secondary text-[12px] tracking-[0px]">
        Manage your linked payment methods for processing deposits and
        withdrawals.
      </p>

      {paymentMethods?.map((method, idx) => (
        <div key={idx} className="my-1 grid gap-1">
          <div className="flex flex-row items-center">
            <div className="flex justify-between w-full bg-lightBackground border-[1px] border-[#D4E4F2] h-[30px] p-[10px] rounded-[2px] items-center">
              <p className="text-secondary text-[12px] font-bold tracking-[0px]">
                {method.bankDetail //bank account
                  ? method.bankDetail.name
                  : //else card
                    method.cardDetail?.cardType}
              </p>
              <p className="text-secondary text-[12px] font-bold tracking-[0px]">
                ***
                {method.bankDetail //bank account
                  ? method.bankDetail.accountNumber?.slice(-4)
                  : //else card
                    method.cardDetail?.cardNumberLast4}
              </p>
            </div>
            <div className="cursor-pointer flex justify-center items-center bg-white border rounded-full w-[28px] h-[25px] ml-[10px]">
              <Trash size={11} />
            </div>
          </div>
          <GeneralCheckbox
            label={method.isPrimary ? "Preferred Account" : "Set as Preferred"}
            isChecked={method.isPrimary}
            onChange={() =>
              setPrefered(method.isPrimary ? paymentMethods[0].id : method.id)
            }
            disabled={isLoading}
          />
        </div>
      ))}
      <CustomButton
        onClick={() => setOpenMethodModal(true)}
        className="mt-[8px] bg-active w-fit h-[30px] rounded-[2px] text-[#ffffff]"
      >
        ADD PAYMENT METHOD
      </CustomButton>

      {openMethodModal && (
        <GeneralModal
          title="Add A Payment Method"
          setShowModal={setOpenMethodModal}
          className="w-fit"
        >
          {data ? (
            <iframe
              src={data.order.url}
              title="start card addition process"
              height={750}
              width="100%"
              style={{ minWidth: 500 }}
            />
          ) : (
            <div className="w-[300px] shrink-0 flex gap-x-2 gap-y-5 flex-wrap justify-center">
              <div
                className="w-[45%] grid place-items-center border p-5 text-center cursor-pointer"
                onClick={createCustomer}
              >
                <Bank size={40} />
                BANK ACCOUNT
              </div>
              <div
                className="w-[45%] grid place-items-center border p-5 text-center cursor-pointer"
                onClick={() => addCard(window.location.origin)}
              >
                <Wallet size={40} />
                Card
              </div>
              <CustomButton
                className="w-full bg-[#D4E4F2]"
                onClick={() => setOpenMethodModal(false)}
              >
                CANCEL
              </CustomButton>
            </div>
          )}
        </GeneralModal>
      )}
    </div>
  );
};

export default BankAccounts;
