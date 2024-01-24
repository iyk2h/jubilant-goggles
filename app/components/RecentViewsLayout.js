import React from "react";
import { AirplaneDepartIcon, CloseIcon } from "../utils/icon/Icon";

import { formatAirportDate } from "../utils/DateUtils";
import { useLocale } from "next-intl";

const RecentViewsLayout = ({
  flightInfo,
  onConfirm,
  flight_num,
  hover,
  onRemove,
}) => {
  const { departureAirportCode, departureTime, arrivalAirportCode } =
    flightInfo;

  const locale = useLocale();

  return (
    <div
      className={`bg-right-bg rounded-xl  p-1 shadow-lg ${
        hover ? "hover:bg-left-bg cursor-pointer" : ""
      }`}
    >
      <div>
        <div className="flex justify-between" onClick={onConfirm}>
          <div className="px-3 py-1 w-full">
            <div className="flex justify-between">
              <p className="text-xl">{flight_num}</p>
              <div
                className="flex rounded-full p-1.5 hover:bg-right-bg"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
              >
                <CloseIcon />
              </div>
            </div>
            <div className="flex justify-betwen">
              <div className="flex gap-2">
                <p className="text-base">{departureAirportCode}</p>
                <div className="flex justify-center items-center w-1/6">
                  <AirplaneDepartIcon />
                </div>
                <p className="text-base">{arrivalAirportCode}</p>
              </div>
              <div className="flex justify-center items-center text-right">
                <p className="text-xs mt-1">
                  {formatAirportDate(departureTime, locale)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentViewsLayout;
