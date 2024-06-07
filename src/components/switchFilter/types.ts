import { ReadonlyURLSearchParams } from "next/navigation";

export interface SwitchFilterProps {
  items: SwitchFilterItem[];
  searchParams: ReadonlyURLSearchParams;
}

export interface SwitchFilterItem {
  name: string;
  param: string;
  value: string;
}
