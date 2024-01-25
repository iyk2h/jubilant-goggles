export const getAirportInfo = async (cityName, query) => {
  const response = {
    name: "",
    country: "",
    city: "",
    timezone: "",
  };

  try {
    const airportApi = await fetch(
      `https://api.aviowiki.com/free/airports/search?query=${query}`
    ).then((res) => res.json());

    // 조건에 맞는 항목 찾기
    const matchingAirport = airportApi.content.find((airport) => {
      return (
        (cityName === airport.servedCity && query === airport.iata) ||
        cityName === airport.servedCity ||
        query === airport.iata
      );
    });

    if (matchingAirport) {
      // 조건에 맞는 항목이 있으면 해당 정보로 response 업데이트
      response.name = matchingAirport.name;
      response.country = matchingAirport.country.name;
      response.city = matchingAirport.servedCity;
      response.timezone = matchingAirport.timeZone;
    } else if (airportApi.content[0]) {
      // 조건에 맞는 항목이 없으면 기본적으로 첫 번째 항목으로 response 업데이트
      response.name = airportApi.content[0].name;
      response.country = airportApi.content[0].country.name;
      response.city = airportApi.content[0].servedCity;
      response.timezone = airportApi.content[0].timeZone;
    }
  } catch (error) {
    console.error(error);
  }

  return response;
};
