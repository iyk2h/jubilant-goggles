const cheerio = require("cheerio");
const axios = require("axios");

const cache = {};

const crawl = async (url) => {
  if (cache[url] !== undefined) {
    return cache[url];
  }

  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const getAirportInfo = (selector) => ({
      code: getFlightInfo(`${selector} .airport-header-code`),
      city: getFlightInfo(`${selector} .airport-header-name`),
    });
    const getTableData = (tableId) =>
      $(`table#${tableId} tr.even:first td`).text();

    const getFlightInfo = (selector) => $(selector, "#ffStatus").text();

    const departureInfo = getAirportInfo(".airport-header-left");
    const arrivalInfo = getAirportInfo(".airport-header-rite");

    const departureTime = getTableData("ffDepartureInfo");
    const arrivalTime = getTableData("ffArrivalInfo");

    if (
      departureInfo.code === "" ||
      departureInfo.city === "" ||
      arrivalInfo.code === "" ||
      arrivalInfo.city === ""
    ) {
      cache[url] = null;
      return null;
    }

    const result = {
      departureAirportCode: departureInfo.code,
      departureCity: departureInfo.city,
      departureTime,
      arrivalAirportCode: arrivalInfo.code,
      arrivalTime,
      arrivalCity: arrivalInfo.city,
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
