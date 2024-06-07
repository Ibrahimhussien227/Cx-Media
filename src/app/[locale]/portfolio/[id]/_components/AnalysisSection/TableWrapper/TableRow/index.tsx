import { Eye } from "@/utils/icons";
import { IRowComponent } from "./type";

const TableRow = ({ data }: IRowComponent) => {
  return (
    <tr
      className="default-custom-table cursor-pointer bg-white group transition-all duration-500 ease-in-out text-[12px]"
      onClick={() => {}}
    >
      {/* PERIOD */}
      <td className="relative no-border flex flex-row items-center font-MinionPro py-4 pl-4">
        {data.period}
      </td>
      {/* AMOUNT */}
      <td className="no-border font-bold">
        <p>{data.amount}</p>
      </td>
      {/* EARNINGS */}
      <td className="no-border">
        <p className="text-secondary text-[14px] tracking-[0px]">
          {data.timestamp}
        </p>
      </td>
      {/* PURCHASE */}
      <td className="relativ no-border w-[100px]">
        <p className="text-secondary tracking-[0px]">{data.txID}</p>
      </td>
      <td className="relative font-MinionPro  no-border min-w-3 w-3 p-0 bg-[#FFFAF8] group-hover:bg-[#FFFAF8]">
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
