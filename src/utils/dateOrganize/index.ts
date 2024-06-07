export const organizeDate = (date: string) => {
  const dates = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(dates);
  return formattedDate.replace(/,/g, ""); // Remove the comma after the year

  // return date
  //   ? new Date(date).toLocaleString(undefined, {
  //       month: "numeric",
  //       day: "numeric",
  //       year: "numeric",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       second: "2-digit",
  //     })
  //   : "";
};
