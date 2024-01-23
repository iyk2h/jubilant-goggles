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
        <div className="flex justify-between">
          <div className="px-3 py-1 w-full" onClick={onConfirm}>
            <p className="text-xl">{flight_num}</p>
            <div className="flex justify-between">
              <div className="flex gap-2 justify-center">
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
          <div className="p-2 pt-3 rounded-r-xl" onClick={onRemove}>
            <CloseIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentViewsLayout;
