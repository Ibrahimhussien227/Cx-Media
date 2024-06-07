import { IHorizontalBarsProps } from "../../HorizontalBars/type";

export interface ILineChart {
  data: {
    title: string;
    value: number;
    color: string;
  }[];
  xAxisStep: IHorizontalBarsProps["xAxisStep"];
  xAxisMax: IHorizontalBarsProps["xAxisMax"];
  header: string;
}
