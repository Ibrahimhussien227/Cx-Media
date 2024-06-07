export const chartData = {
  labels: ["2023", "2024", "2025", "2026", "2027"],
  datasets: [
    {
      //   label: "EST. Rental Yield",
      data: [100, 250, 330, 470, 600],
      borderWidth: 1,
      borderColor: "#ff6c02",
      backgroundColor: "rgba(255, 108, 2, 0.4)",
      pointRadius: 5,
      pointHoverRadius: 10,
    },
    {
      //   label: "EST. Appreciation",
      data: [100, 150, 256, 354, 478],
      borderWidth: 1,
      borderColor: "#D384FD",
      backgroundColor: "rgba(243, 219, 255, 0.4)",
      pointRadius: 5,
      pointHoverRadius: 10,
    },
    {
      //   label: "Your Investment",
      data: [100, 100, 100, 100, 100],
      borderWidth: 1,
      borderColor: "#0093FF",
      backgroundColor: "rgba(0, 147, 255, 0.4)",
      pointStyle: "circle",
      pointRadius: 5,
      pointHoverRadius: 10,
    },
  ],
};
