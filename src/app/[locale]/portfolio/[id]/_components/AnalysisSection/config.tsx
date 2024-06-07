export const chartData = {
  labels: ["Q1’23", "Q2’23", "Q3’23", "Q1’24", "Q2’24"],
  datasets: [
    {
      label: "Actual",
      data: [100, 170, 660, 100, 130],
      borderWidth: 1,
      borderColor: "#0093FF",
      backgroundColor: "rgba(0, 147, 255, 0.4)",
      pointStyle: "circle",
      pointRadius: 5,
      pointHoverRadius: 10,
    },
    {
      label: "Projected",
      data: [400, 460, 120, 54, 40],
      borderWidth: 1,
      borderColor: "#ff6c02",
      backgroundColor: "rgba(255, 108, 2, 0.4)",
      pointRadius: 5,
      pointHoverRadius: 10,
    },
  ],
};
