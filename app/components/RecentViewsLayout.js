import React from "react";
import { CloseIcon } from "../utils/icon/Icon";

const RecentViewsLayout = ({
  flightInfo,
  onConfirm,
  flight_num,
  hover,
  onRemove,
}) => {
  const { departureAirportCode, departureTime, arrivalAirportCode } =
    flightInfo;

  return (
    <div
      className={`bg-gray-100 rounded-xl shadow-lg ${
        hover ? "hover:bg-gray-300 cursor-pointer" : ""
      }`}
    >
      <div>
        <div className="flex justify-between">
          <div className="px-3 py-1 w-full" onClick={onConfirm}>
            <p className="text-xl">{flight_num}</p>
            <div className="flex justify-between">
              <div className="flex gap-2 justify-center">
                <p className="text-base">{departureAirportCode}</p>
                <p className="flex justify-center items-center text-xs ">✈︎</p>
                <p className="text-base">{arrivalAirportCode}</p>
              </div>
              <div className="text-right">
                <p className="text-sm mt-1">{departureTime}</p>
              </div>
            </div>
          </div>
          <div className="p-2 pt-3 rounded-r-xl" onClick={onRemove}>
            <CloseIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentViewsLayout;
