import Image from "next/image";

import { IFeeData, ITransactionListProps } from "./type";

const FeesList = ({ headers, data }: ITransactionListProps) => {
  // function accessNestedProperty(
  //   obj: IFeeItem,
  //   accessorKey: keyof IFeeData
  // ): string {
  //   return obj.data[accessorKey];
  // }

  return (
    <ul className="fees-list border-t">
      {data.map((transaction) => (
        <div key={transaction._id}>
          <div className="flex flex-row justify-between py-2 px-3 mt-4 border rounded-[2px] border-[#D4E4F2] bg-[#F5F8FF80] text-[13px]">
            <div className="font-medium text-[#333333]">Transaction ID</div>
            <div className="font-medium tracking-wider">{transaction._id}</div>
          </div>
          {headers.map((head) => (
            <li
              key={"log" + head.header}
              className={`flex gap-2 justify-between pb-4 pt-4 border-gray-200 border-b last:border-b-[0px]`}
            >
              <span className="font-medium text-[13px] text-[#333333] tracking-wide">
                {head.header}
              </span>
              <span className="flex flex-row items-center gap-3 font-medium tracking-wide text-[13px] text-primary">
                {head.header == "Payment Method" && (
                  <Image
                    src={"/images/visa.png"}
                    width={25}
                    height={20}
                    alt="Visa Payment"
                  />
                )}

                {transaction.data[head.accessorKey as keyof IFeeData]}
                {/* {accessNestedProperty(
                  transaction,
                  head.accessorKey as keyof IFeeData
                )} */}
              </span>
            </li>
          ))}
        </div>
      ))}
    </ul>
  );
};

export default FeesList;
