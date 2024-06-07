import { IInvestmentCard } from "./type";

const InvestmentCard = ({
  className,
  title,
  amount,
  date,
  data,
  children,
  transactionID,
}: IInvestmentCard) => {
  return (
    <div
      className={`flex flex-col border-[1px] border-[#d4e4f285] bg-white rounded-[2px] p-[20px] relative ${className}`}
    >
      <span className="absolute flex bg-[#FF6C02] h-[2px] w-[10px] top-[-1px] right-0 left-0 m-auto" />
      <p className="text-[10px] text-secondary tracking-[1.5px] font-bold">
        {title}
      </p>
      <div className="flex font-MinionPro">
        <p className="flex text-[20px]">{amount}</p>
        <p className="flex text-secondary text-[12px] pt-[8px] pl-[5px]">AED</p>
      </div>
      <p className="text-secondary text-[12px] tracking-[0] font-bold">
        {date}
      </p>
      <div className="flex flex-col my-[10px]">
        {Object.keys(data).map((key) => {
          return (
            <div key={key} className="flex justify-between mb-[5px]">
              <p className="text-secondary text-[12px] tracking-[0px]">
                {data[key].label}
              </p>
              <p
                className={`${
                  data[key].reddish
                    ? "text-[#FF5A5A]"
                    : "text-secondary tracking-[0px]"
                } text-[12px] font-bold`}
              >
                {data[key].value}
              </p>
            </div>
          );
        })}
      </div>
      {transactionID && (
        <div className={`mb-2 pt-2 border-t ${children && "border-b pb-2"}`}>
          {/* pinkgiant862 */}
          <p className="text-secondary text-[12px] tracking-[0px]">
            Transaction ID
          </p>
          <p className={`text-secondary tracking-[0px] text-[12px] font-bold`}>
            {transactionID}
          </p>
        </div>
      )}
      {children}
    </div>
  );
};

export default InvestmentCard;
