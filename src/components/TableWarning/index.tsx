const TableWarning = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  return (
    <div
      className={`w-fit border rounded-sm px-2 font-bold text-[13px] ${className}`}
    >
      {text}
    </div>
  );
};

export default TableWarning;
