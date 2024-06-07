import TableSkeleton from "../../_comps/Table";

const OverviewSkeleton = ({ withTable }: { withTable?: boolean }) => {
  return (
    <div>
      <div className="flex flex-row items-center w-full h-[54px] bg-white">
        <div className="flex flex-row w-full items-center px-3">
          <div className="h-2 w-[120px] bg-[#D4E4F2] rounded" />
        </div>
      </div>
      <div className="flex flex-col bg-[#ffffff] mt-5">
        <div className="bg-white px-3 font-bold flex gap-3 items-center justify-between">
          <h2 className="font-bold mt-3" />
        </div>
        <div className="flex flex-col py-3"></div>
        <span className="flex bg-[#F5FAFF] h-[2px] mx-3" />
        <div className="bg-white my-3 px-3 font-bold flex gap-3 items-center justify-between">
          <span className="h-2 w-[110px] my-1 bg-[#D4E4F2] rounded" />
          <span className="h-2 w-[30px] my-1 bg-[#D4E4F2] rounded" />
        </div>
        <span className="flex bg-[#F5FAFF] h-[2px] mx-3" />
        <div className="bg-white my-3 px-3 font-bold flex gap-3 items-center justify-between">
          <span className="h-2 w-[110px] my-1 bg-[#D4E4F2] rounded" />
          <span className="h-2 w-[30px] my-1 bg-[#D4E4F2] rounded" />
        </div>
        <span className="flex bg-[#F5FAFF] h-[2px] mx-3" />
        <div className="flex flex-col py-3">
          <div className="bg-white px-3 font-bold flex gap-3 items-center justify-between">
            <span className="h-2 w-[110px] my-1 bg-[#D4E4F2] rounded" />
            <span className="h-2 w-[30px] my-1 bg-[#D4E4F2] rounded" />
          </div>
        </div>
      </div>
      {/* TABLE */}
      {withTable && (
        <div className="bg-white pt-5 w-full mt-5">
          <TableSkeleton />
        </div>
      )}
    </div>
  );
};

export default OverviewSkeleton;
