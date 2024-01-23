import React from "react";
import { formatAirportDate } from "../utils/DateUtils";
import { useLocale } from "next-intl";
import { AirplaneDepartIcon } from "../utils/icon/Icon";

const FlightInfoLayout = ({ flightInfo, onConfirm, text, hover }) => {
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
      className={`bg-right-bg rounded-xl  p-1 shadow-lg ${
        hover ? "hover:bg-left-bg cursor-pointer" : ""
      }`}
      onClick={onConfirm}
    >
      <div className="flex justify-center">
        <div className="text-center w-2/5">
          <p className="text-2xl">{departureAirportCode}</p>
          <p className="text-xs">{departureCity}</p>
          <p className="text-xs mt-1">
            {formatAirportDate(departureTime, locale)}
          </p>
        </div>
        <div className="flex justify-center items-center w-1/5">
          <p className="pb-2">
            <AirplaneDepartIcon />
          </p>
        </div>
        <div className="text-center w-2/5">
          <p className="text-2xl">{arrivalAirportCode}</p>
          <p className="text-xs">{arrivalCity}</p>
          <p className="text-xs mt-1">
            {formatAirportDate(arrivalTime, locale)}
          </p>
        </div>
        {text && (
          <div className="flex items-center rotate-180 mr-1">{text}</div>
        )}
      </div>
    </div>
  );
};

export default FlightInfoLayout;
