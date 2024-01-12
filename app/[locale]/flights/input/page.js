"use client";

import FlightInfo from "@/app/components/FlightInfo";
import { useFlightsActions } from "../layout";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import FlightHistoryLayout from "@/app/components/FlightHistoryLayout";

export default function FlightInputLayout() {
  const t = useTranslations("AddFlight");
  const { addFlight } = useFlightsActions();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("flightHistory");
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      // const today = new Date();

      // const filteredHistory = parsedHistory.filter((item) => {
      //   const keyDate = new Date(
      //     item.key.substring(0, 8).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
      //   );
      //   return keyDate >= today;
      // });

      setHistory(parsedHistory);
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
    <>
      <div className="mt-2">
        <FlightInfo addFlight={addResponse} />
      </div>
      <div className="flex text-lg font-bold mt-8 border-b-2">
        {t("recent_view_list")}
      </div>
      <div>
        <section className="">
          {history.length > 0 ? (
            <div>
              <FlightHistoryLayout history={history} onConfirm={addResponse} />
            </div>
          ) : (
            <>
              <div>
                <p>{t("no_search_history")}</p>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}
