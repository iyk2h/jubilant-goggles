"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFlightsActions, useFlightsValue } from "./layout";
import { getAirportInfos } from "../../api/airportInfo/AirportInfo";
import FlightHistoryLayout from "../../components/FlightHistoryLayout";
import MyButton from "../../components/MyButton";
import { useAirportInfosActions } from "../AirportProvider";
import { CloseIcon, LoadingIcon, PlusIcon } from "../../utils/icon/Icon";
import { useTranslations } from "next-intl";

import axios from "axios";
const murmurhash = require("murmurhash");

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
      const hashed = murmurhash.v3(originalValue).toString();
      return hashed;
    };

    const title = `${airport[0].departureInfo.datetime}_${
      airport[0].departureInfo.city
    } -> ${airport[airport.length - 1].arrivalInfo.city}`;

    const beforKey = `${flights.map((info) => info.key).join("_")}`;
    const key = hashValue(beforKey);

    if (hasDuplicate(airportInfos, key)) {
      router.replace(`/nap/${key}`);
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

    setAirportInfo({ airport, title });

    const newHistory = [...airportInfos, { key, title }];

    const sortedHistory = newHistory.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });

    localStorage.setItem("nap_tips", JSON.stringify(sortedHistory));
    setAirportInfos(sortedHistory);
    router.replace(`/nap/${key}`);
  };

  useEffect(() => {
    const storedAirports = localStorage.getItem("nap_tips");
    if (storedAirports) {
      setAirportInfos(JSON.parse(storedAirports));
    }
  }, []);

  useEffect(() => {
    if (flights.length === 0) {
      router.replace("/flights/input");
    }
  }, [flights]);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">{t("myflights")}</div>
        <div
          className="flex p-1 mx-1 cursor-pointer rounded-full border-2 border-left-bg hover:bg-left-bg"
          onClick={() => {
            router.back();
          }}
        >
          <CloseIcon />
        </div>
      </div>
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
        {flights.length <= 3 && (
          <div className="flex justify-center w-full mt-1">
            <MyButton
              text={
                <div className="flex justify-center items-center gap-1">
                  <PlusIcon /> {t("search_flight")}
                </div>
              }
              onClick={() => {
                router.push("/flights/input");
              }}
            />
          </div>
        )}
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
                    <MyButton
                      text={t("done")}
                      type={"positive"}
                      onClick={confirmHandle}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="py-8 mt-7 text-center text-base bg-right-bg rounded-xl">
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
