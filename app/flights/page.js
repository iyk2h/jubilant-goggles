"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFlightsActions, useFlightsValue } from "./layout";
import { getAirportInfos } from "../api/airportInfo/AirportInfo";
import FlightHistoryLayout from "../components/FlightHistoryLayout";
import MyButton from "../components/MyButton";
import { useAirportInfosActions } from "../AirportProvider";

export default function Flights() {
  const router = useRouter();
  const flights = useFlightsValue();

  const [airportInfos, setAirportInfos] = useState([]);

  const cancelHandle = () => {
    router.back();
  };

  const { setAirportInfo } = useAirportInfosActions();

  const { removeFlight } = useFlightsActions();

  const confirmHandle = async () => {
    if (flights.length === 0) {
      alert("비행을 추가해 주세요.");
      return;
    }

    const airport = await Promise.all(
      flights.map((info) => getAirportInfos(info.key, info.response))
    );

    setAirportInfo(airport);

    const key = `${flights[0].response.departureTime}_${
      airport[flights.length - 1].arrivalInfo.city
    }`;

    const newHistory = [...airportInfos, { key, airport }];

    localStorage.setItem("airportInfos", JSON.stringify(newHistory));
    setAirportInfos(newHistory);
    router.replace("/nap");
  };

  useEffect(() => {
    const storedAirports = localStorage.getItem("airportInfos");
    if (storedAirports) {
      setAirportInfos(JSON.parse(storedAirports));
    }
  }, []);

  useEffect(() => {
    if (flights.length === 0) {
      router.replace("/flights/input");
    }
  }, [flights]);

  const addFlight = () => {
    router.replace("/flights/input");
  };

  return (
    <div className="px-4">
      <>
        <section>
          {flights.length > 0 && (
            <div>
              <FlightHistoryLayout
                title="flights"
                history={flights}
                onConfirm={removeFlight}
                onClickTitle={"삭제"}
              />
            </div>
          )}
          {flights.length <= 3 && (
            <div
              className="bg-gray-100 text-center py-3 my-3 rounded-xl text-lg cursor-pointer"
              onClick={addFlight}
            >
              비행 추가 하기
            </div>
          )}
        </section>
        <section className="flex justify-between my-3">
          <div className="flex items-start">
            <MyButton text="취소" onClick={cancelHandle} />
          </div>
          <div className="flex items-end">
            <MyButton text="확인" onClick={confirmHandle} />
          </div>
        </section>
      </>
    </div>
  );
}
