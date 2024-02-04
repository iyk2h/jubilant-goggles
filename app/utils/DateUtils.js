const { DateTime, Locale } = require("luxon");

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

export const formatDateForUTC_0 = (info) => {
  return DateTime.fromFormat(info.datetime, "M/d/yyyy, h:mm:ss a")
    .setZone(info.timezone, {
      keepLocalTime: true,
    })
    .toUTC(0)
    .toISO();
};

export const getDiffTime = (diff) => {
  return {
    // hours: diff.toFormat("hh"),
    minutes: diff.toFormat("m"),
  };
};

export const getDiffTimeString = (diff, locale) => {
  if (locale !== "ko") {
    return diff.toFormat("h 'hours' m 'minutes flight'");
  }
  return diff.toFormat("h시간 m분 비행");
};

export const formatDateString = (dateTime, locale) => {
  if (locale !== "ko") {
    return dateTime.toFormat("LLL dd, hh:mm(ZZZZ)");
  }
  return dateTime.toFormat("M월 d일, hh:mm(ZZZZ)");
};

export const formatStrS = (input, locale) => {
  if (locale !== "ko") {
    return DateTime.fromFormat(input, "M/d/yyyy, h:mm:ss a").toFormat(
      "LLL dd, hh:mm"
    );
  }
  return DateTime.fromFormat(input, "M/d/yyyy, h:mm:ss a").toFormat(
    "M월 d일, hh:mm"
  );
};

export const nowDate = () => {
  return DateTime.local();
};

export const getDateForCalender = () => {
  return DateTime.local().toFormat("yyyy-MM-dd");
};

export const getTomorrowDateForCalender = () => {
  return DateTime.local().plus({ days: 1 }).toFormat("yyyy-MM-dd");
};

export const getManthStartDateForCalender = () => {
  return DateTime.local().startOf("month").toFormat("yyyy-MM-dd");
};

export const formatFromCrawl = (input) => {
  return DateTime.fromFormat(input, "LLL/d/yyyy, h:mm a").toFormat(
    "M/d/yyyy, h:mm:ss a"
  );
};

export const formatAirportDate = (input, locale) => {
  const cleanedString = input.replace(",", "");
  const [time, ampm, month, day] = cleanedString.split(/\s+/);
  const year = 2024;

  const dateTime = formatFromCrawl(`${month}/${day}/${year}, ${time} ${ampm}`);
  if (locale !== "ko") {
    return DateTime.fromFormat(dateTime, "M/d/yyyy, h:mm:ss a").toFormat(
      "LLL dd, h:mm a"
    );
  }
  return formatStrS(dateTime, locale);
};
