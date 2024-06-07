// import { ChangeEvent } from "react";

export interface IRangeSlider {
  title: string;
  color: string;
  value: string;
  min: number;
  max: number;
  step: number;
  children: React.ReactNode;
  changeHandler: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  forModal?: boolean;
}
