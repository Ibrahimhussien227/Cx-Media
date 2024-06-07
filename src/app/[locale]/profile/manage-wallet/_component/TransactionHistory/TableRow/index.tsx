import { formatDate } from "@/utils/formatDate";
import { IRowComponent } from "./type";
import { Eye } from "@/utils/icons";

const TableRow = ({ data }: IRowComponent) => {
  return (
    <tr
      className="default-custom-table cursor-pointer bg-white group border-0 transition-all duration-500 ease-in-out text-[12px]"
      onClick={() => {}}
    >
      {/* TYPE */}
      <td className="py-3 no-border">
        <div className="flex flex-row items-center justify-start gap-3 px-3">
          <span
            className={`w-[6px] h-[6px] border-[1px] ${
              data.transactionStatus === "COMPLETED"
                ? "border-[#12EF90] bg-[#90F4C9]"
                : "border-[#FF5A5A]"
            }  rounded-[50%] `}
          />

          <p className="relative">{data.transactionType}</p>
        </div>
      </td>
      {/* AMOUNT */}
      <td className="font-bold no-border text-center">{data.amount}</td>
      {/* EARNINGS */}
      <td className="font-MinionPro text-[16px] no-border text-secondary">
        {formatDate(data.createdAt, ", ")}
      </td>
      <td className="relative font-MinionPro text-[16px] no-border min-w-3 w-3 p-0 bg-[#FFFAF8] group-hover:bg-[#FFFAF8]">
        <div
          className="absolute flex justify-center items-center bg-white border rounded-full w-[28px] h-[28px] top-[calc(50%-14px)] right-[0px] 
          opacity-0 transition-opacity ease-in-out group-hover:opacity-100 group-hover:duration-300 group-hover:delay-150"
        >
          <Eye size={15} />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
