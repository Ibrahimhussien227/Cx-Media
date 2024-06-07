


const CallOut =({
  children,
  className
}: {
  children: React.ReactNode,
  className?: string;
})=> {
  return (
    <div
      className={`bg-[#232F4B] border-[1px] border-[#5A6A93] rounded-[2px] p-[20px] relative ${className}`}
    >
      <span className="absolute bg-[#FF6C02] h-[2px] w-[10px] top-[-1px] right-auto left-[20px] m-auto"></span>
      {children}
    </div>
  );
}

export default CallOut;