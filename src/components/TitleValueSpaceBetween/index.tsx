import { IDetailItemProps } from "./type";

const DetailItem = ({
  title,
  description,
  subDescription,
  currency = false,
  subCurrency = false,
}: IDetailItemProps) => {
  return (
    <div className="flex justify-between px-[15px] py-[4px]">
      <p className="text-[#5A6A93] text-[14px] font-medium">{title}</p>
      <p className=" text-[15px] font-bold">
        {description && currency ? `${description} AED` : description ?? "-"}
        <span className="text-[#2C3A5C80]">
          {subDescription &&
            `/${
              subDescription && subCurrency
                ? `${subDescription} AED`
                : subDescription ?? "-s"
            }`}
        </span>
      </p>
    </div>
  );
};

export default DetailItem;
