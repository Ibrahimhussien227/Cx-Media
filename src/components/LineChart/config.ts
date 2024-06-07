export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Set to false to fit the chart to the wrapper div
  width: "auto", // Adjust the width and height to take the wrapper div
  height: "auto", // Set these to 'auto' to automatically adjust to the size of the parent container
  plugins: {
    legend: {
      display: false,
      labels: {
        font: {
          size: 10,
        },
      },
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
