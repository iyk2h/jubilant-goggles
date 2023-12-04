const airportInfo = require("airport-info");
const { DateTime } = require("luxon");

const cache = {};

const getAirportInfos = async (date, info) => {
  const departureAirportInfoWithDateTime = await createAirportInfoWithDateTime(
    date,
    info.departureAirportCode,
    info.departureTime
  );

  const arrivalAirportInfoWithDateTime = await createAirportInfoWithDateTime(
    date,
    info.arrivalAirportCode,
    info.arrivalTime
  );
  return { departureAirportInfoWithDateTime, arrivalAirportInfoWithDateTime };
};

const createAirportInfoWithDateTime = async (date, airportCode, timeString) => {
  const cacheKey = `${airportCode}_${date}_${timeString}`;
  if (cache[cacheKey]) {
    console.log("Cache hit!");
    return cache[cacheKey];
  }

  try {
    const airportInfo = await getAirportInfo(airportCode);
    const infoWithDateTime = {
      name: airportInfo.name,
      country: airportInfo.country,
      city: airportInfo.city,
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
  const dateios = new Date(formattedDateString).toISOString();

  return DateTime.fromISO(dateios).setZone(timezone);
};

module.exports = {
  getAirportInfos,
};
