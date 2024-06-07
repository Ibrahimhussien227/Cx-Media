const CampaignDetailsSkeleton = () => {
  return (
    <div className=" animate-pulse flex flex-col bg-[#ffffff]">
      {/* image */}
      <div className="h-[240px] w-full mb-3">
        <div className="w-full h-full bg-[#D4E4F2]" />
      </div>
      {/* <CampaignStatus */}
      <div className="w-full flex justify-center items-center mb-3">
        <div className="w-full h-7 bg-[#D4E4F2] rounded-xl mx-3" />
      </div>
      <div className="bg-white  px-3 font-bold flex gap-3 items-center justify-between">
        {/* property name */}
        <div className="h-3 w-[280px] bg-[#D4E4F2] rounded-md" />
        {/* StatusTag */}
        <div className="w-[100px] h-4 bg-[#D4E4F2] rounded-xl" />
      </div>
      {/* DetailItem */}
      <div className="flex flex-row justify-between p-3 mt-2">
        <div>
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
        </div>
        <div>
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
        </div>
      </div>
      <span className="flex bg-[#F5FAFF] h-[2px] mx-3" />
      <div className="flex mx-[15px] mt-[15px]">
        {/* ProgressBar */}
        <div className="w-full flex justify-center items-center mb-3">
          <div className="w-full h-3 bg-[#D4E4F2] rounded-xl" />
        </div>
      </div>
      {/* DetailItem */}
      <div className="flex flex-row justify-between p-3">
        <div>
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
        </div>
        <div>
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
        </div>
      </div>
      <span className="flex bg-[#F5FAFF] h-[2px] mx-3" />
      {/* DetailItem */}
      <div className="flex flex-row justify-between p-3">
        <div>
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
        </div>
        <div>
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
          <div className="h-2 w-[140px] bg-[#D4E4F2] rounded-md mb-3" />
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailsSkeleton;
