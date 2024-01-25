import React from "react";
import { formatAirportDate } from "../utils/DateUtils";
import { useLocale } from "next-intl";
import { AirplaneDepartIcon } from "../utils/icon/Icon";

const FlightInfoLayout = ({ flightInfo, onConfirm, text, hover, index }) => {
  const {
    departureAirportCode,
    departureCity,
    departureTime,
    arrivalAirportCode,
    arrivalCity,
    arrivalTime,
  } = flightInfo;

  const locale = useLocale();

  return (
    <div
      className={`bg-right-bg rounded-xl p-1 pb-2 shadow-lg ${
        hover ? "hover:bg-left-bg cursor-pointer" : ""
      }`}
      onClick={onConfirm}
    >
      <div
        id={`select_search_flight__${index}`}
        className="flex justify-center py-1"
      >
        <div
          id={`select_search_flight_left_${index}`}
          className="text-center w-2/5"
        >
          <p
            id={`select_search_flight_left_code_${index}`}
            className="text-2xl"
          >
            {departureAirportCode}
          </p>
          <p id={`select_search_flight_left_city_${index}`} className="text-xs">
            {departureCity}
          </p>
          <p
            id={`select_search_flight_left_date_${index}`}
            className="text-xs mt-1"
          >
            {formatAirportDate(departureTime, locale)}
          </p>
        </div>
        <div
          id={`select_search_flight_icon${index}`}
          className="flex justify-center items-center w-1/5"
        >
          <p className="pb-2">
            <AirplaneDepartIcon id={`select_search_flight_icon__${index}`} />
          </p>
        </div>
        <div
          id={`select_search_flight_right_${index}`}
          className="text-center w-2/5"
        >
          <p
            id={`select_search_flight_right_code_${index}`}
            className="text-2xl"
          >
            {arrivalAirportCode}
          </p>
          <p
            id={`select_search_flight_right_city_${index}`}
            className="text-xs"
          >
            {arrivalCity}
          </p>
          <p
            id={`select_search_flight_right_date_${index}`}
            className="text-xs mt-1"
          >
            {formatAirportDate(arrivalTime, locale)}
          </p>
        </div>
        {text && (
          <div
            id={`select_search_flight_right_date_${index}`}
            className="flex items-center rotate-180 mr-1"
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightInfoLayout;
