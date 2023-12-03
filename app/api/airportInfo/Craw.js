const cheerio = require("cheerio");
const axios = require("axios");

const cache = {};

const crawl = async (url) => {
  if (cache[url]) {
    return cache[url];
  }

  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const airport1Script = $(
      "table#ffDepartureInfo tr.odd.first span.airport script"
    );

    const departureAirport = airport1Script.html().match(/"([^"]+)"/)[1];

    const departureTime = $("table#ffDepartureInfo tr.even td").text();

    const airport2Script = $(
      "table#ffArrivalInfo tr.odd.first span.airport script"
    );
    const arrivalAirport = airport2Script.html().match(/"([^"]+)"/)[1];

    const scheduledTime2Raw = $("table#ffArrivalInfo tr.even td").text();

    const arrivalTime = scheduledTime2Raw;

    const parsedArrivalTime = parseTimeStringToDate(arrivalTime);
    console.log(parsedArrivalTime);

    const result = {
      departureAirport,
      departureTime,
      arrivalAirport,
      arrivalTime,
    };

    cache[url] = result;

    console.log("craw result : ", result);

    return result;
  } catch (error) {
    console.error("크롤 에러", error);
  }
};

const parseTimeStringToDate = (timeString) => {
  const cleanedString = timeString.replace(",", "");
  const [time, ampm, month, day] = cleanedString.split(/\s+/);

  const year = new Date().getFullYear();

  const formattedDateString = `${month} ${day}, ${year} ${time} ${ampm}`;

  return new Date(formattedDateString).toLocaleString();
};

module.exports = {
  crawl,
};
