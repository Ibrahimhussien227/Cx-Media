
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export const formatDate =(
  date: string | Date,
  separator: " " | ", ",
  parts: string[] = ['t', 'd', 'm', 'y']
)=> {
  const dateObj = typeof date === 'string'? new Date(date) : date;

  return parts.reduce((dateStr, part, idx)=> {
    let datePart = '';
    switch (part){
      case 't': // time
        datePart = dateObj.getHours().toString().padStart(2, "0") + ':' + dateObj.getHours().toString().padStart(2, "0");
        break;
      case 'd': // date
        datePart = dateObj.getDate() + '';
        break;
      case 'm': // month
        datePart = months[dateObj.getMonth()];
        break;
      case 'y':// year
        datePart = dateObj.getFullYear() + '';
    }
    return dateStr + datePart + (
      idx === parts.length - 1? '' : // don't add the separator to the end
      part == 'd'? ' ' : // the seprator between data and month is always a space
      separator
    )
  }, '')

}