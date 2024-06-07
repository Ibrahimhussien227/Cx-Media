const StatsSkeleton = () => {
  return (
    <div className="animate-pulse border-blue-300 shadow-sm max-w-sm w-fit flex grow shrink-0 gap-4 bg-gradient-blue-white p-4">
      <div className="flex space-x-4">
        {/* image */}
        <div className="rounded-full bg-[#D4E4F2] h-10 w-10"></div>
        {/* text */}
        <div className="flex-1 space-y-3 py-1">
          <div className="h-2 w-[120px] bg-[#D4E4F2] rounded" />
          <div className="space-y-3">
            <div className="h-2 w-[30px] bg-[#D4E4F2] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSkeleton;
