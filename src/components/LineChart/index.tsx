"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ILineChartProps } from "./type";
import { chartOptions } from "./config";

const LineChart = ({ data, legendY }: ILineChartProps) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <>
      {legendY && (
        <span className="hidden lg:block tracking-widest -rotate-90 text-[#BFC5D5] mt-4 min-w-[140px] mr-[-35px]">
          {legendY}
        </span>
      )}
      <Line
        data={{
          labels: data.labels,
          datasets: data.datasets,
        }}
        options={chartOptions}
      />
    </>
  );
};

export default LineChart;
