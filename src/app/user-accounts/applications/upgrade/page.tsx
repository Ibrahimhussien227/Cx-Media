"use client";

import DownloadWrapper from "@/components/DownloadWrapper";
import StatusTag from "@/components/StatusTag";
import TextInput from "@/components/TextInput";
import { useForm } from "react-hook-form";

const AccountUpgrade = () => {
  const { register } = useForm({
    defaultValues: {
      assetAmount: "",
      supportDoc1: "",
      supportDoc2: "",
      possessExperience: "",
      pastStockInvestment: "",
      pastRealStateInvestment: "",
      pastEnterpriseInvestment: "",
      knowledgeDoc1: "",
      knowledgeDoc2: "",
    },
  });

  return (
    <section className="w-full overflow-hidden col-start-1 md:col-end-4 flex flex-col gap-4 h-screen overflow-y-scroll no-scrollbar pb-[120px]">
      <div className="bg-white p-3 font-bold flex gap-3 items-center">
        <p className="font-bold py-2 text-[#2C3A5C] opacity-50">
          Application ID
        </p>
        <p className="font-bold text-[16px]">AID-134-13414</p>
        <StatusTag text="ACTIVE" />
      </div>
      <div className="bg-white p-3">
        <TextInput
          className="w-full "
          {...register("assetAmount")}
          label="Do you have Net. Assets amounting to at least US$1 million?"
          readOnly
        />
        <label className="w-full capitalize text-[12px] font-bold pl-2.5 mb-5">
          Supporting Documents
        </label>
        <div className="w-[380px] grid gap-3 mt-2">
          <DownloadWrapper value={"License.pdf"} readOnly />
          <DownloadWrapper value={"License.pdf"} readOnly />
        </div>
        <hr className="my-5" />
        <TextInput
          {...register("possessExperience")}
          label="Do you possess sufficient experience and understanding of financial markets, products, transactions, and associated risks?"
          readOnly
        />
        <TextInput
          {...register("pastStockInvestment")}
          label="Have you invested in Stocks and/or Bonds in the past?"
          readOnly
        />
        <hr className="my-5" />
        <TextInput
          {...register("pastRealStateInvestment")}
          label="Have you invested before in Real Estate in the past?"
          readOnly
        />
        <hr className="my-5" />
        <TextInput
          {...register("pastEnterpriseInvestment")}
          label="Have you invested directly or indirectly in any enterprise in the past?"
          readOnly
        />
        <hr className="my-5" />
        <label className="w-full capitalize text-[12px] font-bold pl-2.5 mb-5">
          Upload Documents demonstrating your knowldege and experience investing
          in these assets.
        </label>
        <div className="w-[380px] grid gap-3 mt-2">
          <DownloadWrapper value={"License.pdf"} readOnly />
          <DownloadWrapper value={"License.pdf"} readOnly />
        </div>
      </div>
    </section>
  );
};

export default AccountUpgrade;
