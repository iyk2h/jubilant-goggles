import { useEffect, useState } from "react";

import {
  SleepIcon,
  WakeUpIcon,
  NoCoffee,
  AirplaneDepartIcon,
  AirplaneArrivalIcon,
} from "./Icon";
const { DateTime } = require("luxon");

const RecommendNap = ({ airportInfo }) => {
  const [dateInfo, setDateInfo] = useState({
    departCity: "",
    departStartDate: "",
    departNapStart: "",
    departNapEnd: "",
    departEndDate: "",
    arrivalStartDate: "",
    arrvalNapStart: "",
    arrvalNapEnd: "",
    arrivalEndDate: "",
    arrivalCity: "",
    stopCaffein: "",
  });

  useEffect(() => {
    if (airportInfo) {
      const departureInfo = airportInfo.departureInfo;
      const arrivalInfo = airportInfo.arrivalInfo;

      const departDateForm = formatDate(departureInfo);
      const arrivalDateForm = formatDate(arrivalInfo);
      const flightTime = getDiffTime(arrivalDateForm.diff(departDateForm));
      const departEndDateForm = departDateForm.plus(flightTime);
      const arrivalStartDateForm = arrivalDateForm.minus(flightTime);

      setDateInfo({
        departCity: departureInfo.city,
        departStartDate: formatDateString(departDateForm),
        departNapStart: formatDateString(departDateForm.plus({ hour: 1 })),
        departNapEnd: formatDateString(departEndDateForm.minus({ hour: 1 })),
        departEndDate: formatDateString(departEndDateForm),
        arrivalStartDate: formatDateString(arrivalStartDateForm),
        arrvalNapStart: formatDateString(
          arrivalStartDateForm.plus({ hour: 1 })
        ),
        stopCaffein: formatDateString(arrivalStartDateForm.minus({ hours: 8 })),
        arrvalNapEnd: formatDateString(arrivalDateForm.minus({ hour: 1 })),
        arrivalEndDate: formatDateString(arrivalDateForm),
        arrivalCity: arrivalInfo.city,
      });
    }
  }, [airportInfo]);

  const getDiffTime = (diff) => {
    return {
      hours: diff.toFormat("hh"),
      minutes: diff.toFormat("mm"),
    };
  };

  const formatDate = (info) => {
    return DateTime.fromFormat(info.datetime, "MM/d/yyyy, h:mm:ss a").setZone(
      info.timezone,
      {
        keepLocalTime: true,
      }
    );
  };

  const formatDateString = (dateTime) => {
    return dateTime.toFormat("hh:mm a, LLL dd");
  };

  const recommendItems = [
    {
      departDateTime: dateInfo.stopCaffein,
      departDescription: "지금부터 커피 금지",
      arrivalDateTime: "",
      arrivalDescription: "",
      icon: <NoCoffee />,
    },
    {
      departDateTime: dateInfo.departStartDate,
      departDescription: "출발",
      arrivalDateTime: dateInfo.arrivalStartDate,
      arrivalDescription: "",
      icon: <AirplaneDepartIcon />,
    },
    {
      departDateTime: dateInfo.departNapStart,
      departDescription: "",
      arrivalDateTime: dateInfo.arrvalNapStart,
      arrivalDescription: "낮잠!",
      icon: <SleepIcon />,
    },
    {
      departDateTime: dateInfo.departNapEnd,
      departDescription: "",
      arrivalDateTime: dateInfo.arrvalNapEnd,
      arrivalDescription: "기상!",
      icon: <WakeUpIcon />,
    },
    {
      departDateTime: dateInfo.departEndDate,
      departDescription: "",
      arrivalDateTime: dateInfo.arrivalEndDate,
      arrivalDescription: "도착!",
      icon: <AirplaneArrivalIcon />,
    },
  ];

  return (
    <>
      {/* idx, recommendItems */}

      <div className="my-">
        <div className="flex items-center justify-center relative">
          <div className="absolute left-0 bg-slate-300 h-full w-1/2 z-0 flex items-center justify-center rounded-l-xl">
            <div className="rotate-90 origin-center pt-20 text-7xl text-white text-center whitespace-nowrap">
              {dateInfo.departCity}
            </div>
          </div>

          <div className="absolute right-0 bg-slate-200 h-full w-1/2 z-0 flex items-center justify-center rounded-r-xl">
            <div className="rotate-90 origin-center pb-20 text-7xl text-white whitespace-nowrap">
              {dateInfo.arrivalCity}
            </div>
          </div>

          <ul
            aria-label="Activity feed"
            role="feed"
            className="relative flex flex-col gap-5 py-12 left-0 before:absolute before:top-0 before:left-[50%] before:h-full before:border before:border-dashed before:border-slate-100 after:absolute after:top-6 after:left-[50%] after:bottom-6 after:border after:border-slate-100"
          >
            {recommendItems.map((item, index) => (
              <li key={index} role="article" className="flex gap-2 mt-5">
                <div className="flex flex-col w-28 text-right">
                  <p className="text-base text-slate-500">
                    {item.departDateTime}
                  </p>
                  <h4 className="text-xl font-medium text-slate-700">
                    {item.departDescription}
                  </h4>
                </div>
                <span className="flex items-center z-10 justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 ring-2 ring-white ">
                  <p className="">{item.icon}</p>
                </span>
                <div className="flex flex-col gap-0 w-28">
                  <p className="text-base text-slate-500">
                    {item.arrivalDateTime}
                  </p>
                  <h4 className="text-xl font-medium text-slate-700">
                    {item.arrivalDescription}
                  </h4>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RecommendNap;
