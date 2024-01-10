import { kv } from "@vercel/kv";

const cheerio = require("cheerio");
const axios = require("axios");
const { crawl } = require("./Craw");

const stopover = async (key, url) => {
  const session = await kv.get(key);
  if (session !== null) {
    console.log("kv : ", key);
    return session;
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
    if (results.length > 0 && results[0]) {
      console.log("stopover ", key, " crawl result : ", results);
      await kv.set(key, results);
      return results;
    }
  } catch (error) {
    console.error("stopover ", key, "에러", " : ", error.response.status);
    return [];
  }
};

module.exports = {
  stopover,
};
