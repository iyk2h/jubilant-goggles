const cheerio = require("cheerio");
const axios = require("axios");
const { crawl } = require("./Craw");

const cache = {};

const stopover = async (url) => {
  if (cache[url] !== undefined) {
    return cache[url];
  }

  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const depaptValues = $(".flightValue.c1 a")
      .map((index, element) => {
        const onclickValue = $(element).attr("onclick");
        const match = onclickValue.split("'&depapt='+");
        return match ? match[1].replaceAll("'", "") : null;
      })
      .get();

    const results = [];

    if (depaptValues.length === 0) {
      const result = await crawl(url);
      if (result !== null) {
        results.push(result);
      }
    } else {
      await Promise.all(
        depaptValues.map(async (val) => {
          const result = await crawl(url + `&depapt=` + val);
          results.push(result);
        })
      );
    }
    cache[url] = results;
    console.log("stopover craw result : ", results);
    return results;
  } catch (error) {
    console.error("stopover 크롤 에러", error);
  }
};

module.exports = {
  stopover,
};
