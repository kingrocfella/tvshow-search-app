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

export const alphabeticDateFormat = (
  date: Date | string,
  time: boolean = false
): string => {
  if (!date) return "-";
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
  var monthIndex: number = date.getMonth();
  var year: number = date.getFullYear();
  var hours: NumString = date.getHours();
  var mins: NumString = date.getMinutes();
  var secs: NumString = date.getSeconds();

  if (day < 10) day = `0${day}`;
  if (hours < 10) hours = `0${hours}`;
  if (mins < 10) mins = `0${mins}`;
  if (secs < 10) secs = `0${secs}`;

  return time
    ? `${day} ${monthNames[monthIndex]}. ${year} ${hours}:${mins}:${secs}`
    : `${day} ${monthNames[monthIndex]}. ${year}`;
};

export const FormatHTMLString = (sum: string): string => {
  if (!sum) return "";
  return sum.replace(/<\/?[^>]+(>|$)/g, "");
};

export const HandleNullValues = (res: any): any => (res ? res : "-");

export const NumberArray = (max: number): Array<number> => {
  let res: Array<number> = [];
  for (let index = 1; index <= max; index++) {
    res.push(index);
  }
  return res;
};

export const HTTPS = (url: string): string => url.replace("http", "https");

export const ConvertToArray = (arr: []): Array<any> => {
  if (arr.length === 0) return [];
  let res: any = [];
  const slice = arr.slice(0,7);
  slice.forEach((item: any) => {
    res.push(item.show.name);
  });
  return res;
};
