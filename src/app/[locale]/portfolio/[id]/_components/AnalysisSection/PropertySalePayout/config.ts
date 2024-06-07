export const AnnualChartData = {
  labels: ["Oct,2023", "Oct,2028"],
  datasets: [
    {
      label: "Actual",
      data: [700000, 1700000],
      borderWidth: 1,
      borderColor: "#9F83FF",
      backgroundColor: "rgba(	159, 131, 255, 0.4)",
      pointStyle: "circle",
      pointRadius: 5,
      pointHoverRadius: 10,
    },
    {
      label: "Projected",
      data: [700000, 1100000],
      borderWidth: 1,
      borderColor: "#ff6c02",
      backgroundColor: "rgba(255, 108, 2, 0.4)",
      pointRadius: 5,
      pointHoverRadius: 10,
    },
  ],
};

export const earnings = {
  numOfShares: {
    label: "No. Of Shares",
    value: "3000",
  },
  salePrice: {
    label: "Sale Price",
    value: "5456.0 AED",
  },
  platformFee: {
    label: "Platform Fee",
    value: "(35.00) AED",
    reddish: true,
  },
  taxes: {
    label: "Taxes",
    value: "(1.75) AED",
    reddish: true,
  },
};
