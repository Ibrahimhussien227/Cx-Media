const Row = ({ bgColor }: { bgColor: string }) => {
  return (
    <div className={`flex flex-row ${bgColor}`}>
      <div className="flex justify-center items-center h-12 w-full mx-5 px-4">
        <div className="h-2 w-[130px] bg-[#D4E4F2] rounded-md"></div>
      </div>
      <div className="flex justify-center items-center h-12 w-full mx-5 px-4">
        <div className="h-2 w-[130px] bg-[#D4E4F2] rounded-md"></div>
      </div>
      <div className="flex justify-center items-center h-12 w-full mx-5 px-4">
        <div className="h-2 w-[130px] bg-[#D4E4F2] rounded-md"></div>
      </div>
      <div className="flex justify-center items-center h-12 w-full mx-5 px-4">
        <div className="h-2 w-[130px] bg-[#D4E4F2] rounded-md"></div>
      </div>
      <div className="flex justify-center items-center h-12 w-full mx-5 px-4">
        <div className="h-2 w-[130px] bg-[#D4E4F2] rounded-md"></div>
      </div>
      <div className="flex justify-center items-center h-12 w-full mx-5 px-4">
        <div className="h-2 w-[130px] bg-[#D4E4F2] rounded-md"></div>
      </div>
    </div>
  );
};

export default Row;
