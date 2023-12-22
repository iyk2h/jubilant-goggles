import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import airlines from "../data/airlines.json";
import SelectorAirportCode from "../components/SelectorAirportCode";

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

  const [responses, setResponses] = useState({});
  const [loadings, setLoadings] = useState({});
  const [key, setKey] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (airlineCode && flightNumber.length >= 1) {
      getFlightInfo();
    }
  }, [departureDate, airlineCode, flightNumber]);

  const formatDate = (inputDate) => {
    const dateObject = new Date(inputDate);
    const formattedDate = `${dateObject.getFullYear()}${String(
      dateObject.getMonth() + 1
    ).padStart(2, "0")}${String(dateObject.getDate()).padStart(2, "0")}`;
    return formattedDate;
  };

  const getFlightInfo = async () => {
    const key = `${airlineCode.iata}_${flightNumber}_${formatDate(
      departureDate
    )}`;
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
        date: formatDate(departureDate),
      };

      const { data } = await axios.post(apiUrl, requestData);

      setResponses((prevResponses) => {
        const newResponses = { ...prevResponses };
        newResponses[key] = data;
        return newResponses;
      });

      setError(null);
    } catch (error) {
      setError(
        <>
          비행 정보가 없습니다.
          <br /> 날짜와 Flight Number를 다시 확인해주세요.
        </>
      );
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
        </section>
        {loadings[key] ? (
          <div className="flex justify-center py-5">
            <div className="mr-3 mb-1">
              <SpinnerCircular />
            </div>
          </div>
        ) : (
          <div className="py-5 px-3">
            {responses[key] ? (
              <div>
                <div
                  className="bg-gray-100 hover:bg-gray-300 rounded-xl cursor-pointer"
                  // onClick={() => addResponse(responses[key])}
                >
                  <div className="flex justify-between px-2">
                    <div className="text-center">
                      <p className="text-5xl">
                        {responses[key].departureAirportCode}
                      </p>
                      <p className="text-xl">{responses[key].departureCity}</p>
                      <p className="text-base mt-1">
                        {responses[key].departureTime}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl mt-2"> ✈︎ </p>
                      <p className="text-2xl text-teal-900">확인</p>
                    </div>
                    <div className="text-center">
                      <p className="text-5xl">
                        {responses[key].arrivalAirportCode}
                      </p>
                      <p className="text-xl">{responses[key].arrivalCity}</p>
                      <p className="text-base mt-1">
                        {responses[key].arrivalTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p className="text-center text-xl">{error}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightInfo;
