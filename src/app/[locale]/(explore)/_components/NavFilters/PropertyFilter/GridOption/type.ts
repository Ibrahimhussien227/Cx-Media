import { Icon } from "@phosphor-icons/react";

export interface IGridOptionProps {
  options: { value: string; icon: Icon }[];
  value: { value: string; icon: Icon };
  variant?: string;
  errorTabs?: string[];
  searchParams: ISearchParamsProps["searchParams"];
}
