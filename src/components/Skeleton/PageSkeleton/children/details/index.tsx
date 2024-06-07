const DetailSkeleton = () => {
  return (
    <div>
      {/* ID */}
      <div className="flex flex-row items-center w-full h-[54px] bg-white">
        <div className="flex flex-row w-full items-center px-3">
          <div className="h-2 w-[120px] bg-[#D4E4F2] rounded" />
        </div>
      </div>
      {/* ACCORDIONS */}
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <div key={index} className="bg-white pt-3 w-full mt-5">
            <div className="animate-pulse h-20 bg-white flex flex-col justify-center items-center px-3">
              <div className="h-full w-full flex flex-row justify-between items-center p-2">
                <div className="h-4 w-[15%] md:w-[20%] bg-[#D4E4F2] rounded-md" />
                <div className="flex flex-row justify-center items-center">
                  <div className="h-[32px] w-[75px] bg-[#D4E4F2] m-2" />
                  <div className="h-[32px] w-[75px] bg-[#D4E4F2] m-1" />
                  <div className="h-[30px] w-[30px] rounded-full bg-[#D4E4F2] ml-4" />
                </div>
              </div>
              <div className=" h-1 border-b w-[98%] mb-3" />
            </div>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default DetailSkeleton;
