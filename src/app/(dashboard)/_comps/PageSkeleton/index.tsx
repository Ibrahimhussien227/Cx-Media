import StatsSkeleton from "@/components/Skeleton/Stats";

const PageSkeleton = () => {
  return (
    <section className="p-5 w-full flex flex-col gap-4 max-h-full overflow-y-auto">
      <div className="flex flex-wrap bg-white p-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatsSkeleton key={index} />
        ))}
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="p-4 bg-white animate-pulse grow h-96 flex flex-col gap-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="h-3 w-full bg-[#D4E4F2] rounded" />
          ))}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-3 w-80 bg-[#D4E4F2] rounded" />
          ))}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-3 w-72 bg-[#D4E4F2] rounded" />
          ))}

          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="h-3 w-60 bg-[#D4E4F2] rounded" />
          ))}
        </div>
        <div className="lg:w-1/2 flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="p-4 bg-white animate-pulse grow h-44 flex gap-2 flex-col"
            >
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="h-3 w-full bg-[#D4E4F2] rounded" />
              ))}
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="h-3 w-80 bg-[#D4E4F2] rounded" />
              ))}
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="h-3 w-72 bg-[#D4E4F2] rounded" />
              ))}

              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-3 w-60 bg-[#D4E4F2] rounded" />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap bg-white p-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatsSkeleton key={index} />
        ))}
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="p-4 bg-white animate-pulse grow h-96 flex flex-col gap-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="h-3 w-full bg-[#D4E4F2] rounded" />
          ))}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-3 w-80 bg-[#D4E4F2] rounded" />
          ))}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-3 w-72 bg-[#D4E4F2] rounded" />
          ))}

          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="h-3 w-60 bg-[#D4E4F2] rounded" />
          ))}
        </div>
        <div className="p-4 bg-white animate-pulse grow h-96 flex flex-col gap-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="h-3 w-full bg-[#D4E4F2] rounded" />
          ))}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-3 w-80 bg-[#D4E4F2] rounded" />
          ))}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-3 w-72 bg-[#D4E4F2] rounded" />
          ))}

          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="h-3 w-60 bg-[#D4E4F2] rounded" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PageSkeleton;
