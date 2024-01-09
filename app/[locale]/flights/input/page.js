"use client";

import FlightInfo from "@/app/components/FlightInfo";
import { useFlightsActions } from "../layout";
import { useState, useEffect, useRef } from "react";
import FlightHistoryLayout from "@/app/components/FlightHistoryLayout";
import { useTranslations } from "next-intl";
import { CheckIcon, DropdownIcon } from "@/app/utils/icon/Icon";

export default function FlightInputLayout() {
  const t = useTranslations("AddFlight");
  const { addFlight } = useFlightsActions();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (selectedItem) => {
    setFlag(selectedItem);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const closeDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, [dropdownRef]);

  const [flag, setFlag] = useState(true);

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
    <>
      <div
        className="relative inline-block text-left px-2 pb-2"
        ref={dropdownRef}
      >
        <div
          className="flex text-2xl font-bold cursor-pointer"
          onClick={toggleDropdown}
        >
          {flag ? t("search_new_air_info") : t("recent_view_list")}
          <DropdownIcon />
        </div>
        {isDropdownOpen && (
          <div className="origin-top-right absolute left-0 mt-2 w-48 rounded-lg shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div
                onClick={() => handleSelect(true)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-b-2"
                role="menuitem"
              >
                <div className="flex gap-1">
                  {flag ? <CheckIcon /> : <>ㅤㅤ</>}
                  {t("search_new_air_info")}
                </div>
              </div>
              <div
                onClick={() => {
                  if (history.length > 0) handleSelect(false);
                }}
                className={`block px-4 py-2 text-sm text-gray-700  ${
                  history.length > 0
                    ? "hover:bg-gray-100 hover:text-gray-900"
                    : ""
                }`}
                role="menuitem"
              >
                <div className="flex gap-1">
                  {flag ? <>ㅤㅤ</> : <CheckIcon />}
                  {t("recent_view_list")}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {flag ? (
        <div className="mt-2">
          <FlightInfo addFlight={addResponse} />
        </div>
      ) : (
        <div className="mt-2">
          <section className="px-2">
            {history.length > 0 ? (
              <div>
                <FlightHistoryLayout
                  history={history}
                  onConfirm={addResponse}
                  onClickTitle={t("select")}
                />
              </div>
            ) : (
              <></>
            )}
          </section>
        </div>
      )}
    </>
  );
}
