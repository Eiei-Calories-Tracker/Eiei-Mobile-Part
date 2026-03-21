import { DateData } from "react-native-calendars";
export const formatDate = (dateString: string) => {
  const d = new Date(dateString);

  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const stringToDateData = (dateString: string): DateData => {
  const d = new Date(dateString);

  return {
    dateString: dateString.split("T")[0],
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear(),
    timestamp: d.getTime(),
  };
};
export const rangeFormatDate = (dateString: string) => {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
