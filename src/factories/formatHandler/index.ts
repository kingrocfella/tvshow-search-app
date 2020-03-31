type NumString = number | string;

export const FormatSearchTerm = (term: string): string =>
  term.replace(/ /g, "-");

export const FlattenArray = (arr: []): string | [] => {
  if (!Array.isArray(arr)) return [];
  let res = "";
  for (let index = 0; index < arr.length; index++) {
    if (arr[index + 1]) res += `${arr[index]}, `;
    else res += arr[index];
  }
  return res;
};

export const alphabeticDateFormat = (date: Date | string): string => {
  if (!date) return "";
  date = new Date(date);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  var day: NumString = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hours: NumString = date.getHours();
  var mins: NumString = date.getMinutes();
  var secs: NumString = date.getSeconds();

  if (day < 10) day = `0${day}`;
  if (hours < 10) hours = `0${hours}`;
  if (mins < 10) mins = `0${mins}`;
  if (secs < 10) secs = `0${secs}`;

  //CHECK IF DATE HAS TIME
  if (hours === "00" && mins === "00" && secs === "00")
    return `${day} ${monthNames[monthIndex]}. ${year}`;
  return `${day} ${monthNames[monthIndex]}. ${year} ${hours}:${mins}:${secs}`;
};

export const FormatHTMLString = (sum: string): string => sum.replace(/<\/?[^>]+(>|$)/g, "");

export const HandleNullValues = (res: any): any => res ? res : "-";
