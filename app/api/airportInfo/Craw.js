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

    const getFlightInfo = (selector) => $(selector, "#ffStatus").text();
    const getTableData = (tableId) => $(`table#${tableId} tr.even td`).text();

    const departureAirportCode = getFlightInfo(
      ".airport-header-left .airport-header-code"
    );
    const departureCity = getFlightInfo(
      ".airport-header-left .airport-header-name"
    );
    const departureTime = getTableData("ffDepartureInfo");

    const arrivalAirportCode = getFlightInfo(
      ".airport-header-rite .airport-header-code"
    );
    const arrivalCity = getFlightInfo(
      ".airport-header-rite .airport-header-name"
    );
    const arrivalTime = getTableData("ffArrivalInfo");

    const result = {
      departureAirportCode,
      departureCity,
      departureTime,
      arrivalAirportCode,
      arrivalTime,
      arrivalCity,
    };

    cache[url] = result;

    console.log("craw result : ", result);

    return result;
  } catch (error) {
    console.error("크롤 에러", error);
  }
};

module.exports = {
  crawl,
};
