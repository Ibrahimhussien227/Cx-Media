"use client";
import CustomButton from "@/components/CustomButton";
import { /* Minus, */ Plus } from "@/utils/icons";
import { useEffect, useState } from "react";
import GeneralModal from "@/components/Modal";
import CustomSelect from "@/components/CustomSelect";
import { useLazyAsync } from "@/hooks/useAsync";
import {
  createPaymentIntent,
  depositWithTelr,
  useGetPaymentOps,
} from "./utils";
import { LeanFlowEndStatus } from "@/types/enum.constants";
import { IWalletSectionProps } from "./types";

const CurrentBalance = ({
  customerId,
  paymentMethods,
  wallet,
  revalidateWallet,
  revalidateTransactions,
}: IWalletSectionProps) => {
  const [isDepositeModalOpen, setIsDepositeModalOpen] = useState(false);
  const [createLeanIntent, { data: leanIntent, isLoading }, resetLeanIntent] =
    useLazyAsync(createPaymentIntent);
  const [telrDepost] = useLazyAsync(depositWithTelr);

  const methodsOptions = useGetPaymentOps(paymentMethods);

  const primaryMethod = paymentMethods.find((meth) => meth.isPrimary);
  const primaryMethodId =
    primaryMethod &&
    (primaryMethod.bankDetail
      ? primaryMethod.bankDetail.investorBankId
      : primaryMethod.cardId);

  const [selectedMethod, setSelectedMethod] = useState(
    methodsOptions.find((method) => method.value === primaryMethodId) ||
      methodsOptions[0]
  );
  const [amount, setAmount] = useState<number>(1000);

  // lean deposit
  useEffect(() => {
    if (leanIntent && isDepositeModalOpen) {
      const selectedMethodData = paymentMethods.find(
        (method) => method.bankDetail?.investorBankId === selectedMethod?.value
      );
      window.Lean.pay({
        app_token: process.env.NEXT_PUBLIC_LEAN_APP_TOKEN,
        payment_intent_id: leanIntent.intentId,
        show_balances: false,
        sandbox: true,
        account_id: selectedMethodData?.bankDetail?.accountId,
        callback: (respObj: { status: string }) => {
          if (
            respObj.status === LeanFlowEndStatus.SUCCESS &&
            revalidateWallet
          ) {
            revalidateWallet();
            revalidateTransactions();
            setIsDepositeModalOpen(false);
            resetLeanIntent();
          }
        },
      });
    }
  }, [
    isDepositeModalOpen,
    leanIntent,
    revalidateWallet,
    revalidateTransactions,
    paymentMethods,
    selectedMethod?.value,
    resetLeanIntent,
  ]);

  const handleDeposite = () => {
    const selectedMethodData = paymentMethods.find(
      (method) =>
        (method.cardId || method.bankDetail?.investorBankId) ===
        selectedMethod?.value
    );
    if (selectedMethodData?.cardId) {
      // telr pathway
      telrDepost({ amount, cardId: selectedMethodData.cardId });
    } else if (selectedMethodData?.bankDetail) {
      // lean pathway
      createLeanIntent({
        amount: amount,
        currency: "AED",
        investorBankId: selectedMethodData.bankDetail.investorBankId,
        customerId: customerId,
      });
    }
  };

  return (
    <div className="flex flex-col">
      <p className=" text-[10px] font-bold">CURRENT BALANCE</p>
      <p className=" text-[26px] font-MinionPro tracking-[0px]">
        {wallet?.balance.toFixed(2) || "0.00"}
        <span className="text-secondary text-[20px]">
          {wallet?.currencyAbbr}
        </span>
      </p>
      <div className="flex mt-[10px] flex-wrap">
        <CustomButton
          onClick={() => setIsDepositeModalOpen(true)}
          className="h-[40px] flex items-center justify-center border-[#D4E4F2] border-[1px] bg-white text-secondary rounded-[2px] mr-[5px]"
        >
          <span className="cursor-pointer flex justify-center items-center bg-white border rounded-full w-[20px] h-[20px] ml-[10px] mr-[5px]">
            <Plus size={14} />
          </span>
          DEPOSIT
        </CustomButton>
      </div>
      {isDepositeModalOpen && (
        <GeneralModal
          title="Make a Deposite"
          setShowModal={setIsDepositeModalOpen}
          className="w-[300px]"
        >
          <div>
            <p className="text-[12px] tracking-tight text-center">
              Please enter the amount you wish to deposit and specify the
              account your prefer to use for the transaction.
            </p>
            <form className="my-2 flex flex-col gap-2">
              <label>
                Amount
                <span className="border inline-flex w-full mt-1">
                  <input
                    type="number"
                    value={amount}
                    onChange={(evt) => setAmount(+evt.target.value)}
                    className="w-full px-1"
                  />
                  <span className="border inline-block p-1">AED</span>
                </span>
              </label>
              <label>
                Account/Method
                <CustomSelect
                  options={methodsOptions}
                  value={selectedMethod}
                  onChange={(selectedOp) => setSelectedMethod(selectedOp)}
                  className="w-full mt-1"
                />
              </label>
              <div className="flex gap-2 my-2">
                <CustomButton
                  className="w-1/2 bg-[#D4E4F2]"
                  onClick={() => setIsDepositeModalOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  onClick={handleDeposite}
                  className=" bg-active w-1/2 rounded-[2px] text-[#ffffff]"
                  disabled={!amount || isLoading}
                  type="button"
                >
                  Confirm
                </CustomButton>
              </div>
            </form>
          </div>
        </GeneralModal>
      )}
    </div>
  );
};

export default CurrentBalance;
