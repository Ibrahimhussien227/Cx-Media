const LogsListSkeleton = () => {
  const array = ["w-[80px]", "w-[60px]", "w-[95px]", "w-[110px]", "w-[90px]"];
  return (
    <ul className=" animate-pulse">
      {array.map((len, index) => (
        <li
          key={index}
          className="flex gap-2 justify-between pb-4 pt-4 border-t border-gray-200"
        >
          <div className={`h-2 ${len} bg-[#ccc] rounded-md`} />
          <div className={`h-2 ${len} bg-[#D4E4F2] rounded-md`} />
        </li>
      ))}
    </ul>
  );
};

export default LogsListSkeleton;
