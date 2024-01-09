import React, { useEffect, useState } from "react";
import axios from "axios";

import airlines from "../data/airlines.json";
import SelectorAirportCode from "../components/SelectorAirportCode";

import { Nanum_Gothic_Coding } from "next/font/google";
import { getDateForCalender, removeHyphens } from "../utils/DateUtils";
import FlightInfoLayout from "./FlightInfoLayout";
import { LoadingIcon } from "../utils/icon/Icon";
import { useTranslations } from "next-intl";

const nanum_Gothic_Coding = Nanum_Gothic_Coding({
  weight: "400",
  subsets: ["latin"],
});

const FlightInfo = ({ addFlight }) => {
  const t = useTranslations("AddFlight");

  const today = getDateForCalender();

  const [departureDate, setDepartureDate] = useState(today);
  const [airlineCode, setAirlineCode] = useState(airlines[0]);
  const [displayCode, setDisplayCode] = useState(airlines[0]);
  const [flightNumber, setFlightNum] = useState("");

  const [responses, setResponses] = useState({});
  const [loadings, setLoadings] = useState({});
  const [key, setKey] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (airlineCode && flightNumber.length >= 1) {
      getFlightInfo();
    }
  }, [departureDate, airlineCode, flightNumber]);

  const setErrorMessage = () => {
    setError(<>{t("notFound_air_info")}</>);
  };

  const getFlightInfo = async () => {
    const key = `${removeHyphens(departureDate)}_${
      airlineCode.iata
    }_${flightNumber}`;
    setKey(key);

    if (responses[key]) {
      return;
    }

    setLoadingsKey(true, key);

    try {
      const apiUrl = "/api/airportInfo";
      const requestData = {
        airline: airlineCode.iata,
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
      <div>
        <section>
          <div className="pl-2">
            <h2 className="text-xl font-bold">{t("date")}</h2>
            <div>
              <input
                className="text-base bg-gray-200 rounded-lg px-2 py-1 cursor-pointer"
                type="date"
                value={departureDate}
                min={today}
                onChange={(e) => {
                  setDepartureDate(e.target.value);
                }}
              />
            </div>
          </div>
        </section>

        <section className="flex justify-between">
          <div className="pl-2">
            <h2 className="text-xl font-bold pt-2 mt-1">{t("flightNum")}</h2>
            <div className={nanum_Gothic_Coding.className}>
              <div className=" w-20 flex flex-wrap justify-center bg-gray-200 rounded-lg p-1">
                <div className="w-20 h-10 px-2">
                  <SelectorAirportCode
                    data={airlines.filter(
                      (person) => person.iata.toString().length === 2
                    )}
                    selected={displayCode}
                    setSelected={setDisplayCode}
                    setCode={setAirlineCode}
                    setNum={setFlightNum}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {loadings[key] ? (
          <div className="flex justify-center py-5">
            <div className="mr-3 mb-1">
              <LoadingIcon />
            </div>
          </div>
        ) : (
          <div className="">
            {responses[key] && responses[key].length !== 0 ? (
              <div>
                {responses[key].map((flightInfo, index) => (
                  <div className="py-2" key={index}>
                    {flightInfo && (
                      <FlightInfoLayout
                        flightInfo={flightInfo}
                        onConfirm={() => {
                          addFlight(
                            key + "_" + flightInfo.arrivalAirportCode,
                            flightInfo
                          );
                        }}
                        text={t("select")}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="text-center text-base py-2">{error}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightInfo;
