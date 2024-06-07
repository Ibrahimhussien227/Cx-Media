const GridFormSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-row justify-between">
      {/* left side */}
      <div className="flex flex-col w-[50%]">
        <div className="min-w-[180px] w-full  bg-white py-3 px-4">
          <div className=" flex flex-col space-y-2">
            {/* row 1 */}
            <div className="h-2 w-[90px] bg-[#D4E4F2] rounded" />
            {/* row 2 */}
            <div className="h-[25px] w-full border rounded" />
          </div>
        </div>
        <div className="min-w-[180px] w-full bg-white py-3 px-4">
          <div className=" flex flex-col space-y-2">
            {/* row 1 */}
            <div className="h-2 w-[90px] bg-[#D4E4F2] rounded" />
            {/* row 2 */}
            <div className="h-[25px] w-full border rounded" />
          </div>
        </div>
        <div className="min-w-[180px] w-full bg-white py-3 px-4">
          <div className=" flex flex-col space-y-2">
            {/* row 1 */}
            <div className="h-2 w-[90px] bg-[#D4E4F2] rounded" />
            {/* row 2 */}
            <div className="h-[25px] w-full border rounded" />
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex flex-col w-[50%]">
        <div className="min-w-[180px] w-full bg-white py-3 px-4">
          <div className=" flex flex-col space-y-2">
            {/* row 1 */}
            <div className="h-2 w-[90px] bg-[#D4E4F2] rounded" />
            {/* row 2 */}
            <div className="h-[25px] w-full border rounded" />
          </div>
        </div>
        <div className="min-w-[180px] w-full  grow gap- 4 bg-white py-3 px-4">
          <div className=" flex flex-col space-y-2">
            {/* row 1 */}
            <div className="h-2 w-[90px] bg-[#D4E4F2] rounded" />
            {/* row 2 */}
            <div className="h-[25px] w-full border rounded" />
          </div>
        </div>
        <div className="min-w-[180px] w-full bg-white py-3 px-4">
          <div className=" flex flex-col space-y-2">
            {/* row 1 */}
            <div className="h-2 w-[90px] bg-[#D4E4F2] rounded" />
            {/* row 2 */}
            <div className="h-[25px] w-full border rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridFormSkeleton;
