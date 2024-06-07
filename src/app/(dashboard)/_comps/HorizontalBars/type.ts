export interface IHorizontalBarsProps {
  data: {
    title: string;
    value: number;
    color: string;
  }[];
  xAxisLabel: (value: number) => string;
  xAxisStep: number;
  xAxisMax?: number;
}
