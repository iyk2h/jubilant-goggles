const { DateTime } = require("luxon");

export const removeHyphens = (inputDate) => {
  return inputDate.replace(/-/g, "");
};

export const formatDate = (info) => {
  return DateTime.fromFormat(info.datetime, "M/d/yyyy, h:mm:ss a").setZone(
    info.timezone,
    {
      keepLocalTime: true,
    }
  );
};

export const getDiffTime = (diff) => {
  return {
    hours: diff.toFormat("hh"),
    minutes: diff.toFormat("mm"),
  };
};

export const formatDateString = (dateTime) => {
  return dateTime.toFormat("hh:mm a, LLL dd");
};
