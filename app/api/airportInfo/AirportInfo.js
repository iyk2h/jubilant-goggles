const airportInfo = require("airport-info");
const { DateTime } = require("luxon");

const cache = {};

const getAirportInfos = async (date, info) => {
  const departureInfo = await createAirportInfoWithDateTime(
    date,
    info.departureAirportCode,
    info.departureTime,
    info.departureCity
  );

  const arrivalInfo = await createAirportInfoWithDateTime(
    date,
    info.arrivalAirportCode,
    info.arrivalTime,
    info.arrivalCity
  );
  return { departureInfo, arrivalInfo };
};

const createAirportInfoWithDateTime = async (
  date,
  airportCode,
  timeString,
  city
) => {
  const cacheKey = `${airportCode}_${date}_${timeString}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    const airportInfo = await getAirportInfo(airportCode);
    const infoWithDateTime = {
      city,
      timezone: airportInfo.timezone,
      datetime: parseDateTimeWithTimezone(
        date,
        timeString,
        airportInfo.timezone
      ),
    };

    cache[cacheKey] = infoWithDateTime;

    return infoWithDateTime;
  } catch (error) {
    console.error("Airport 정보 가져오기 에러", error);
    throw error;
  }
};

const getAirportInfo = (code) => airportInfo.getAirportInfo(code);

const parseDateTimeWithTimezone = (date, timeString, timezone) => {
  const cleanedString = timeString.replace(",", "");
  const [time, ampm, month, day] = cleanedString.split(/\s+/);
  const year = date.substring(0, 4);

  const formattedDateString = `${month} ${day}, ${year} ${time} ${ampm}`;

  return new Date(formattedDateString).toLocaleString();
};

module.exports = {
  getAirportInfos,
};
