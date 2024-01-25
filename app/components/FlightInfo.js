import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import airlines from "../data/airlines.json";

import { getDateForCalender, removeHyphens } from "../utils/DateUtils";
import FlightInfoLayout from "./FlightInfoLayout";
import { BackIcon, LoadingIcon } from "../utils/icon/Icon";
import { useTranslations } from "next-intl";
import SearchFlight from "./SearchFlight";

const FlightInfo = ({ addFlight }) => {
  const t = useTranslations("AddFlight");

  const today = getDateForCalender();

  const [departureDate, setDepartureDate] = useState("");
  const [airlineCode, setAirlineCode] = useState(airlines[0]);
  const [displayCode, setDisplayCode] = useState(airlines[0]);
  const [flightNumber, setFlightNum] = useState("");

  const [responses, setResponses] = useState({});
  const [loadings, setLoadings] = useState({});
  const [key, setKey] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (departureDate !== "" && airlineCode && flightNumber.length >= 1) {
      getFlightInfo();
    }
  }, [departureDate, airlineCode, flightNumber]);

  const setErrorMessage = () => {
    setError(
      <div>
        <div className="p-2 mt-2 font-bold">{t("notFound_air_info_1")}</div>
        <div className="pb-2 mb-2">{t("notFound_air_info_2")}</div>
      </div>
    );
  };

  const getFlightInfo = async () => {
    const key = `${removeHyphens(departureDate)}_${airlineCode}${flightNumber}`;
    setKey(key);

    if (responses[key]) {
      return;
    }

    setLoadingsKey(true, key);

    try {
      const apiUrl = "/api/airportInfo";
      const requestData = {
        airline: airlineCode,
        flightNumber,
        date: removeHyphens(departureDate),
      };

      const { data } = await axios.post(apiUrl, requestData);

      setResponses((prevResponses) => {
        const newResponses = { ...prevResponses };
        newResponses[key] = data;
        return newResponses;
      });

      if (data.length === 0) {
        setErrorMessage();
      } else {
        setError(null);
      }
    } catch (error) {
      setErrorMessage();
    } finally {
      setLoadingsKey(false, key);
    }
  };

  const setLoadingsKey = (value, key) => {
    setLoadings((prevLoadings) => {
      const newLoadings = { ...prevLoadings };
      newLoadings[key] = value;
      return newLoadings;
    });
  };

  return (
    <div>
      <SearchFlight
        code={airlineCode}
        num={flightNumber}
        departureDate={departureDate}
        setDepartureDate={setDepartureDate}
        setCode={setAirlineCode}
        setNum={setFlightNum}
      />
      <div>
        {departureDate !== "" && (
          <>
            {loadings[key] ? (
              <div className="flex justify-center py-5">
                <div className="mr-3 mb-1">
                  <LoadingIcon />
                </div>
              </div>
            ) : (
              <div className="">
                <div className="flex text-lg font-bold mt-2 border-b-2">
                  {t("result")}
                </div>
                {responses[key] && responses[key].length !== 0 ? (
                  <div>
                    {responses[key].map((flightInfo, index) => (
                      <div className="py-2" key={index}>
                        {flightInfo && (
                          <FlightInfoLayout
                            index={index}
                            hover={true}
                            text={
                              <BackIcon
                                id={`select_search_flight_right_date_c_icon${index}`}
                              />
                            }
                            flightInfo={flightInfo}
                            onConfirm={() => {
                              addFlight(
                                key + "_" + flightInfo.arrivalAirportCode,
                                flightInfo
                              );
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="max-h-40 overflow-y-auto border border-gray-300 p-2 rounded-lg mt-2">
                    <li className="text-center text-base">{error}</li>
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FlightInfo;
