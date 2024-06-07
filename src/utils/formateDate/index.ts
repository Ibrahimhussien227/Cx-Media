
export const formateDate = (date: string) => {
  if (!date) return;
  const dates = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(dates);
  return formattedDate; // No need to remove the comma
};
