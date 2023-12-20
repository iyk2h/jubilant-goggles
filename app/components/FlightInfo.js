import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import MyButton from "../components/MyButton";

import airlines from "../data/airlines.json";
import SelectorAirportCode from "../components/SelectorAirportCode";
import RecommendNap from "./RecommendNap";

const { getAirportInfos } = require("../api/airportInfo/AirportInfo");
import { SpinnerCircular } from "spinners-react";
import { Nanum_Gothic_Coding } from "next/font/google";

const nanum_Gothic_Coding = Nanum_Gothic_Coding({
  weight: "400",
  subsets: ["latin"],
});

const FlightInfo = () => {
  const flightNumRef = useRef();

  const [departureDate, setDepartureDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [airlineCode, setAirlineCode] = useState(airlines[0]);
  const [flightNumber, setFlightNum] = useState("");

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [airportInfo, setAirportInfo] = useState("");

  useEffect(() => {
    if (response != null) {
      getAirportInfos(departureDate, response).then((info) => {
        localStorage.setItem("airportInfo", JSON.stringify(info));
        setAirportInfo(info);
        setLoading(false);
      });
    } else {
      localStorage.setItem("airportInfo", "");
    }
  }, [response]);

  const formatDate = (inputDate) => {
    const dateObject = new Date(inputDate);
    const formattedDate = `${dateObject.getFullYear()}${String(
      dateObject.getMonth() + 1
    ).padStart(2, "0")}${String(dateObject.getDate()).padStart(2, "0")}`;
    return formattedDate;
  };

  const handleSubmit = () => {
    if (flightNumber.length <= 1) {
      flightNumRef.current.focus();
      return;
    }

    getFlightInfo();
  };

  const resetResponse = () => {
    setResponse(null);
    setError(null);
    setAirportInfo(null);
  };

  const getFlightInfo = async () => {
    try {
      setLoading(true);

      const apiUrl = "/api/airportInfo";
      const requestData = {
        airline: airlineCode.iata,
        flightNumber,
        date: formatDate(departureDate),
      };

      const { data } = await axios.post(apiUrl, requestData);

      setResponse(data);
      setError(null);
    } catch (error) {
      setResponse(null);
      setError("정보를 가져오지 못했습니다. 입력값을 확인해주세요.");
      alert("정보를 가져오지 못했습니다. 입력값을 확인해주세요.");
      setLoading(false);
    }
  };

  return (
    <div>
      {response ? (
        <div>
          <div
            className="bg-gray-100 hover:bg-gray-300 rounded-xl cursor-pointer"
            onClick={resetResponse}
          >
            <div className="flex justify-between  mx-5">
              <div className="text-center">
                <p className="text-5xl">{response.departureAirportCode}</p>
                <p className="text-xl">{response.departureCity}</p>
                <p className="text-base mt-1">{response.departureTime}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl mt-2"> ✈︎ </p>
                <p className="text-2xl text-gray-100">다시 입력</p>
              </div>
              <div className="text-center">
                <p className="text-5xl"> {response.arrivalAirportCode}</p>
                <p className="text-xl">{response.arrivalCity}</p>
                <p className="text-base mt-1">{response.arrivalTime}</p>
              </div>
            </div>
          </div>
          {!airportInfo ? (
            <div className="flex items-center justify-center pt-15">
              <div className="mt-10">
                <SpinnerCircular />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div>
          <section>
            <div className="pl-4">
              <h2 className="text-2xl font-bold text-teal-900">출발 날짜</h2>
              <div>
                <input
                  className="text-2xl font-bold bg-gray-200 rounded-lg px-2 py-1 cursor-pointer"
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
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

            {loading ? (
              <div className="self-end">
                <div className="mr-3 mb-1">
                  <SpinnerCircular />
                </div>
              </div>
            ) : (
              <div className="self-end">
                <MyButton
                  text={"조회"}
                  type={"positive"}
                  onClick={handleSubmit}
                />
              </div>
            )}
          </section>
        </div>
      )}
      {airportInfo ? (
        <>
          <RecommendNap airportInfo={airportInfo} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FlightInfo;
