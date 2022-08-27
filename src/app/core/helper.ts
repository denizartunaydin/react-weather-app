import moment from "moment";

export const DataFormatType = {
  dateFormat: "DD.MM.YYYY",
  dateTimeFormat: "DD.MM.YYYY HH:mm",
  timeFormat: "HH:mm",
  hourFormat: "HH",
  dayFormat: "DD",
  monthFormat: "MMMM",
  yearFormat: "yyyy",
  getTimeZone: "YYYY-MM-DD",
};

const dateFormat = (date: any, format: string) => {
  if (date) return moment(date).format(format);
};

const objToQueryString = (obj: any) => {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
    );
  }
  return keyValuePairs.join("&");
};

const getWeekDays = () => {
  const dayName = new Date().toLocaleDateString("tr", { weekday: "long" });
  const day = new Date().getDay();
  const month = new Date().toLocaleDateString("tr", { month: "long" });
  return `${dayName}, ${day} ${month}`;
};

const turkishToEnglish = (text: string) => {
  return text
    .replace("Ğ", "g")
    .replace("Ü", "u")
    .replace("Ş", "s")
    .replace("I", "i")
    .replace("İ", "i")
    .replace("Ö", "o")
    .replace("Ç", "c")
    .replace("ğ", "g")
    .replace("ü", "u")
    .replace("ş", "s")
    .replace("ı", "i")
    .replace("ö", "o")
    .replace("ç", "c");
};

export const Helper = {
  dateFormat: dateFormat,
  objToQueryString: objToQueryString,
  getWeekDays: getWeekDays,
  turkishToEnglish: turkishToEnglish,
};
