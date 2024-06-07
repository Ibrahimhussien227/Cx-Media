

const StatusTag = ({ text, color }: { text: string; color: string }) => {
  return (
    <span className={`${color} inline-flex text-[#2C3A5C] text-[10px] px-[10px] font-bold tracking-[1.5px] py-[2px] rounded-[10px] border-[#ffffff] border-[1px] `}>
      {text}
    </span>
  );
};

export default StatusTag;
