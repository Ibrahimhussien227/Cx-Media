export interface ILineChartProps {
  data: {
    labels: string[];
    datasets: {
      label?: string;
      data: number[];
      borderWidth: number;
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  legendY?: string;
}
