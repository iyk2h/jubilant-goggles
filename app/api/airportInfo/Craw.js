const cheerio = require("cheerio");
const axios = require("axios");

const airportInfo = require("airport-info");
const { DateTime } = require("luxon");

const cache = {};

const crawl = async (url, date) => {
  if (cache[url]) {
    return cache[url];
  }

  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const departureScript = $(
      "table#ffDepartureInfo tr.odd.first span.airport script"
    );
    const departureAirportCode = departureScript.html().match(/"([^"]+)"/)[1];
    const departureTime = $("table#ffDepartureInfo tr.even td").text();

    const arrivalScript = $(
      "table#ffArrivalInfo tr.odd.first span.airport script"
    );
    const arrivalAirportCode = arrivalScript.html().match(/"([^"]+)"/)[1];
    const arrivalTime = $("table#ffArrivalInfo tr.even td").text();

    const departureAirportInfoWithDateTime =
      await createAirportInfoWithDateTime(
        date,
        departureAirportCode,
        departureTime
      );

    const arrivalAirportInfoWithDateTime = await createAirportInfoWithDateTime(
      date,
      arrivalAirportCode,
      arrivalTime
    );

    const result = {
      departureAirportCode,
      departureTime,
      arrivalAirportCode,
      arrivalTime,
      departureAirportInfoWithDateTime,
      arrivalAirportInfoWithDateTime,
    };

    cache[url] = result;

    console.log("craw result : ", result);

    return result;
  } catch (error) {
    console.error("크롤 에러", error);
  }
};

const createAirportInfoWithDateTime = async (date, airportCode, timeString) => {
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
  crawl,
};
