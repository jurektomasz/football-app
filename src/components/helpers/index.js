import moment from "moment";

export const capitalize = (value) => {
  if (!value || typeof value !== "string") {
    return "";
  }

  return value
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : ""))
    .join(" ");
};

export const formatDate = (date, dateFormat = "YYYY-MM-DD") => {
  if (!date || typeof date !== "string") {
    return "";
  }

  return moment(date).format(dateFormat);
};

export const displayDate = (gameDate) => {
  const newDate = new Date(gameDate);
  const month = newDate.toLocaleString("default", { month: "short" });
  const day =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : `${newDate.getDate()}`;
  return `${month} ${day}`;
};
