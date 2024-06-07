import StatusText from "@/components/StatusText";

const LsitItem = ({
  title,
  statusText,
  isActive,
  onClick,
}: {
  title: string;
  statusText: string;
  isActive?: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`${
        isActive
          ? "bg-white"
          : "bg-gradient-white-transparent border-[#fffaf800]"
      } flex justify-between w-[270px] p-[10px] mb-[5px] rounded-[2px] relative text-[#2C3A5C] cursor-pointer`}
    >
      {isActive && (
        <div className="top-[17px] absolute left-[-1px] h-3 w-[2px] bg-active" />
      )}
      <span className="text-[#5A6A93] text-[14px]">{title}</span>
      {statusText && (
        <span>
          <StatusText text={statusText} />
        </span>
      )}
    </div>
  );
};

export default LsitItem;
