import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export type DoughnutChartProps = Parameters<typeof Doughnut>[0];

export function DoughnutChart(props: DoughnutChartProps) {
  return <Doughnut {...props} />;
}
