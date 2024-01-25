import React from "react";
import { AirplaneDepartIcon, CloseIcon } from "../utils/icon/Icon";

import { formatAirportDate } from "../utils/DateUtils";
import { useLocale } from "next-intl";

const RecentViewsLayout = ({
  index,
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
        <div
          id={`select_views_flight__${index}`}
          className="flex justify-between"
          onClick={onConfirm}
        >
          <div className="pl-3 pr-1 pt-1 pb-2 w-full">
            <div className="flex justify-between items-center">
              <p
                id={`select_views_flight_title${index}`}
                className="text-xl w-full"
              >
                {flight_num}
              </p>
              <div
                id={`remove_views_flight_${index}`}
                className="flex rounded-full p-1.5 hover:bg-right-bg"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
              >
                <CloseIcon id={`remove_views_flight_icon_${index}`} />
              </div>
            </div>
            <div
              id={`select_views_flight_sub_${index}`}
              className="flex justify-betwen"
            >
              <div
                id={`select_views_flight_sub__${index}`}
                className="flex gap-2 text-base"
              >
                {departureAirportCode}
                <div className="flex justify-center items-center w-1/6">
                  <AirplaneDepartIcon
                    id={`select_views_flight__icon${index}`}
                  />
                </div>
                {arrivalAirportCode}
              </div>
              <div
                id={`select_views_flight_sub_date_${index}`}
                className="flex justify-center items-center text-right text-xs mt-1"
              >
                {formatAirportDate(departureTime, locale)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentViewsLayout;
