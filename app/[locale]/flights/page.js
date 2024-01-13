"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFlightsActions, useFlightsValue } from "./layout";
import { getAirportInfos } from "../../api/airportInfo/AirportInfo";
import FlightHistoryLayout from "../../components/FlightHistoryLayout";
import MyButton from "../../components/MyButton";
import { useAirportInfosActions } from "../AirportProvider";
import { CloseIcon, LoadingIcon, SearchIcon } from "../../utils/icon/Icon";
import { useTranslations } from "next-intl";

import axios from "axios";
const crypto = require("crypto");

export default function Flights() {
  const t = useTranslations("Flights");
  const router = useRouter();
  const flights = useFlightsValue();

  const [airportInfos, setAirportInfos] = useState([]);

  const resetFlights = () => {
    if (flights.length > 0) {
      removeFlightAll();
    }
  };

  const { setAirportInfo } = useAirportInfosActions();

  const { removeFlight, addFlight, removeFlightAll } = useFlightsActions();

  const [loadings, setLoadings] = useState(false);

  const hasDuplicate = (history, key) => {
    return history.some((entry) => entry.key === key);
  };

  const confirmHandle = async () => {
    if (flights.length === 0) {
      alert(t("empty_flight"));
      return;
    }

    setLoadings(true);

    const airport = await Promise.all(
      flights.map((info) => getAirportInfos(info.key, info.response))
    );

    const hashValue = (originalValue) => {
      const hashed = crypto
        .createHash("sha256")
        .update(originalValue)
        .digest("hex");
      return hashed;
    };

    const title = `${airport[0].departureInfo.datetime}_${
      airport[0].departureInfo.city
    } -> ${airport[airport.length - 1].arrivalInfo.city}`;

    const beforKey = `${flights.map((info) => info.key).join("_")}`;
    const key = hashValue(beforKey);

    if (hasDuplicate(airportInfos, key)) {
      alert(t("duplicate_travel"));
      setLoadings(false);
      return;
    }

    try {
      const apiUrl = `/api/nap/${key}`;
      const requestData = {
        key,
        title,
        airport,
      };
      await axios.post(apiUrl, requestData);
    } catch (error) {
      alert(t("failed_nap_tips"));
      return;
    }

    setAirportInfo(airport);

    const newHistory = [...airportInfos, { key, title }];

    const sortedHistory = newHistory.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });

    localStorage.setItem("nap_results", JSON.stringify(sortedHistory));
    setAirportInfos(sortedHistory);
    router.replace(`/nap/${key}`);
  };

  useEffect(() => {
    const storedAirports = localStorage.getItem("nap_results");
    if (storedAirports) {
      setAirportInfos(JSON.parse(storedAirports));
    }
  }, []);

  // useEffect(() => {
  //   if (flights.length === 0) {
  //     router.replace("/flights/input");
  //   }
  // }, [flights]);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">{t("myflights")}</div>
        <div
          className="flex p-1 mx-1 cursor-pointer rounded-full hover:bg-gray-200"
          onClick={() => {
            router.back();
          }}
        >
          <CloseIcon />
        </div>
      </div>
      {flights.length <= 3 && (
        <div
          className="flex gap-2 bg-gray-100 rounded-xl p-2 px-2 mt-1 mb-2 cursor-pointer shadow-lg hover:bg-gray-300"
          onClick={() => {
            router.push("/flights/input");
          }}
        >
          <SearchIcon />
          <p className="text-gray-600">{t("search_flight")}</p>
        </div>
      )}
      <>
        <section>
          {flights.length > 0 && (
            <div>
              <FlightHistoryLayout
                title={t("flights")}
                history={flights}
                onConfirm={() => {}}
                hover={false}
              />
            </div>
          )}
        </section>
        <section className="">
          {loadings ? (
            <div className="flex justify-center items-center py-5">
              <div className="mr-3 mb-1">
                <LoadingIcon />
              </div>
            </div>
          ) : (
            <>
              {flights.length > 0 ? (
                <div className="flex justify-between my-3">
                  <div className="flex items-start">
                    <MyButton text={t("cancel")} onClick={resetFlights} />
                  </div>
                  <div className="flex items-end">
                    <MyButton text={t("done")} onClick={confirmHandle} />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="py-8 mt-7 text-center text-base bg-gray-100 rounded-xl">
                    <p>{t("no_flights_msg_1")}</p>
                    <p>{t("no_flights_msg_2")}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </>
    </div>
  );
}
