const Head = () => {
  return (
    <div className="min-w-[180px] w-full flex justify-center grow gap- 4 bg-white py-3 px-4 mx-5">
      <div className=" flex flex-col space-y-2">
        {/* row 1 */}
        <div className="flex flex-row justify-between items-center space-x-4">
          <div className="h-2 w-[100px] bg-[#D4E4F2] rounded" />
          <div className="h-[18px] w-[18px] bg-[#D4E4F2] rounded" />
        </div>
        {/* row 2 */}
        <div className="flex flex-row justify-between items-center space-x-4">
          <div className="h-[18px] w-[100px] border rounded" />
          <div className="h-[18px] w-[18px] border rounded" />
        </div>
      </div>
    </div>
  );
};

export default Head;
