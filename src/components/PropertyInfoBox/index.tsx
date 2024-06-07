import { IPropertyInfoBoxProps } from "./types";

const PropertyInfoBox = (props: IPropertyInfoBoxProps) => {
  const { title, value } = props;

  return (
    <div className="flex flex-row justify-between items-center">
      <p className="text-secondary font-bold text-[10px]">{title}</p>
      <p className="text-[14px] font-MinionPro">{value}%</p>
    </div>
  );
};
export default PropertyInfoBox;
