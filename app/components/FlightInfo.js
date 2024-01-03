import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import airlines from "../data/airlines.json";
import SelectorAirportCode from "../components/SelectorAirportCode";

import { SpinnerCircular } from "spinners-react";
import { Nanum_Gothic_Coding } from "next/font/google";
import { removeHyphens } from "../utils/DateUtils";
import FlightInfoLayout from "./FlightInfoLayout";
import FlightHistoryLayout from "./FlightHistoryLayout";

const nanum_Gothic_Coding = Nanum_Gothic_Coding({
  weight: "400",
  subsets: ["latin"],
});

const FlightInfo = ({ addFlight }) => {
  const flightNumRef = useRef();

  const formatDate = (date) => {
    const [month, day, year] = date.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const today = formatDate(new Date().toLocaleDateString());

  const [departureDate, setDepartureDate] = useState(today);
  const [airlineCode, setAirlineCode] = useState(airlines[0]);
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
    setError(
      <>
        비행 정보가 없습니다.
        <br /> 날짜와 Flight Number를 다시 확인해주세요.
      </>
    );
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

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("flightHistory");
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      const today = new Date();

      const filteredHistory = parsedHistory.filter((item) => {
        const keyDate = new Date(
          item.key.substring(0, 8).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
        );
        return keyDate >= today;
      });

      setHistory(filteredHistory);
    }
  }, []);

  const addResponse = (key, response) => {
    addFlight(key, response);

    const updatedFlights = history.filter((item) => item.key !== key);
    const newHistory = [{ key, response }, ...updatedFlights.slice(0, 11)];

    localStorage.setItem("flightHistory", JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  return (
    <div>
      <div>
        <section>
          <div className="pl-4">
            <h2 className="text-2xl font-bold text-teal-900">출발 날짜</h2>
            <div>
              <input
                className="text-2xl font-bold bg-gray-200 rounded-lg px-2 py-1 cursor-pointer"
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
          <div className="pl-4">
            <h2 className="text-2xl font-bold text-teal-900 pt-2 mt-1">
              Flight Number
            </h2>
            <div className={nanum_Gothic_Coding.className}>
              <div className=" w-fit flex flex-wrap gap-2 bg-gray-200 rounded-lg p-2">
                <div className="w-10 h-10">
                  <SelectorAirportCode
                    data={airlines.filter(
                      (person) => person.iata.toString().length === 2
                    )}
                    selected={airlineCode}
                    setSelected={setAirlineCode}
                  />
                </div>
                <div className="w-12 h-fit mt-1 relative cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none">
                  <div className="outline-none border-none p-2 text-base font-bold leading-5 text-gray-900 focus:ring-0">
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => {
                        const onlyNumbers = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        const limitedLength = onlyNumbers.slice(0, 4);
                        setFlightNum(limitedLength);
                      }}
                      placeholder="1234"
                      style={{ width: "100%" }}
                      ref={flightNumRef}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {loadings[key] ? (
          <div className="flex justify-center py-5">
            <div className="mr-3 mb-1">
              <SpinnerCircular />
            </div>
          </div>
        ) : (
          <div className="pt-4 px-3">
            {responses[key] && responses[key].length !== 0 ? (
              <div>
                {responses[key].map((flightInfo, index) => (
                  <div className="py-2" key={index}>
                    {flightInfo && (
                      <FlightInfoLayout
                        flightInfo={flightInfo}
                        onConfirm={() => {
                          addResponse(
                            key + "_" + flightInfo.arrivalAirportCode,
                            flightInfo
                          );
                        }}
                        text="선택"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="text-center text-xl">{error}</p>
              </>
            )}
          </div>
        )}
        <section className="py-4">
          {history.length > 0 ? (
            <div className="px-4">
              <FlightHistoryLayout
                title={"최근 조회 내역"}
                history={history}
                onConfirm={addResponse}
                onClickTitle={"선택"}
              />
            </div>
          ) : (
            <></>
          )}
        </section>
      </div>
    </div>
  );
};

export default FlightInfo;
