"use client";

import { useEffect, useState } from "react";
import { TrashIcon } from "../utils/icon/Icon";
import { useRouter } from "next/navigation";
import { useAirportInfosActions } from "./AirportProvider";
import { formatStrS, nowDate, formatDate } from "../utils/DateUtils";
import { useTranslations, useLocale } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");
  const local = useLocale();
  const router = useRouter();

  const [airportInfos, setAirports] = useState([]);
  const nowDateTime = nowDate();

  useEffect(() => {
    const storedAirports = localStorage.getItem("airportInfos");
    const afterToday = [];

    if (storedAirports) {
      const parsedAirports = JSON.parse(storedAirports);

      parsedAirports.forEach((info, index) => {
        const lastDateTime = formatDate(
          info.airport[info.airport.length - 1].arrivalInfo
        );
        if (lastDateTime > nowDateTime) {
          afterToday.push(info);
        }
      });

      setAirports(afterToday);
    }
  }, []);

  const { setAirportInfo } = useAirportInfosActions();

  const clickHandle = (param) => {
    setAirportInfo(param);
    router.push("/nap");
  };

  const clearAirportHistory = () => {
    const isConfirmed = window.confirm(t("deleteAll"));
    if (isConfirmed) {
      localStorage.removeItem("airportInfos");
      setAirports([]);
      router.refresh();
    }
  };

  return (
    <div>
      {airportInfos.length !== 0 ? (
        <>
          {airportInfos.map((info, index) => {
            return (
              <div
                id={`view_detail_${index}`}
                key={index}
                className="flex justify-center bg-gray-100 rounded-xl p-2 my-2 mx-10 text-base text-center cursor-pointer"
                onClick={() => clickHandle(info.airport)}
              >
                <>
                  {info.key.split("_")[2]}
                  <br />
                  {formatStrS(info.key.split("_")[0], local)}
                </>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div
            className={`py-8 m-2 text-center text-base bg-gray-100 rounded-xl`}
          >
            <p>{t("guide_msg_1")}</p>
            <p>{t("guide_msg_2")}</p>
          </div>
        </>
      )}

      <div className="flex justify-between m-5  mx-20  mb-20">
        <div
          id="add_flight"
          className="flex justify-center w-full bg-gray-300 rounded-xl p-2 cursor-pointer"
          onClick={() => {
            router.push("/flights");
          }}
        >
          <div
            id="add_flight_icons"
            className="flex justify-normal items-center"
          >
            <div id="add_flight_msg">{t("addTravel")}</div>
          </div>
        </div>
        {airportInfos.length !== 0 && (
          <div
            id="clear_airport_his"
            className="flex justify-center items-center w-10 bg-gray-300 rounded-xl mx-1 px-1 cursor-pointer"
            onClick={clearAirportHistory}
          >
            <TrashIcon />
          </div>
        )}
      </div>
    </div>
  );
}
