import { useEffect, useState } from "react";

const { DateTime } = require("luxon");
import { BanCoffeeIcon, CoffeeIcon } from "./Icon";

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

  return (
    <>
      <div className="mt-3">
        <div className="flex items-center justify-center relative">
          <div className="absolute left-0 bg-slate-300 h-full w-1/2 z-0 flex items-center rounded-l-xl">
            <div className=" rotate-90 origin-center pt-20 text-7xl text-white text-center whitespace-nowrap">
              {dateInfo.departCity}
            </div>
          </div>

          <div className="absolute right-0 bg-slate-200 h-full w-1/2 z-0 flex items-center rounded-r-xl">
            <div className="rotate-90 origin-center text-7xl pt-10 text-white text-center whitespace-nowrap">
              {dateInfo.arrivalCity}
            </div>
          </div>

          <ul
            aria-label="Activity feed"
            role="feed"
            className="relative flex flex-col gap-5 py-12 left-[0rem] before:absolute before:top-0 before:left-[8.7rem] before:h-full before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-[8.7rem] after:bottom-6 after:border after:border-slate-200"
          >
            <li role="article" className="flex gap-2 mt-5">
              <div className="flex flex-col w-28 text-right">
                <p className="text-base text-slate-500">
                  {dateInfo.stopCaffein}
                </p>
                <h4 className="text-xl font-medium text-slate-700">
                  커피 금지
                </h4>
              </div>
              <span className="flex items-center z-10 justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 ring-2 ring-white ">
                <p className="">
                  <BanCoffeeIcon />{" "}
                </p>
              </span>
              <div className="flex flex-col gap-0 w-28">
                <p className="text-base text-slate-500"></p>
                <h4 className="text-xl font-medium text-slate-700"></h4>
              </div>
            </li>
            <li role="article" className="flex gap-2">
              <div className="flex flex-col w-28 text-right">
                <p className="text-xl text-slate-700 h-6">ㅤ</p>
                <p className="text-base text-slate-500">
                  {dateInfo.departStartDate}
                </p>
                <h4 className="text-xl text-slate-700">
                  출발
                  {/* {dateInfo.departCity} */}
                </h4>
              </div>
              <span className="flex items-center z-10 justify-center w-10 h-10 mt-6 rounded-full bg-slate-200 text-slate-700 ring-2 ring-white ">
                <p className="text-3xl mb-1 -rotate-45"> ✈︎ </p>
              </span>
              <div className="flex flex-col gap-0 w-28">
                <p className="text-xl text-slate-600 h-6">ㅤ</p>
                <p className="text-base text-slate-500">
                  {dateInfo.arrivalStartDate}
                </p>
              </div>
            </li>
            <li role="article" className="flex gap-2 mt-5">
              <div className="flex flex-col w-28 text-right">
                <p className="text-base text-slate-500">
                  {dateInfo.departNapStart}
                </p>
              </div>
              <span className="flex items-center z-10 justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 ring-2 ring-white ">
                <p className="text-3xl mt-1"> ☾ </p>
              </span>
              <div className="flex flex-col gap-0 w-28">
                <p className="text-base text-slate-500">
                  {dateInfo.arrvalNapStart}
                </p>
                <h4 className="text-xl font-medium text-slate-700">낮잠!</h4>
              </div>
            </li>
            <li role="article" className="flex gap-2 mt-5">
              <div className="flex flex-col w-28 text-right">
                <p className="text-base text-slate-500">
                  {dateInfo.departNapEnd}
                </p>
              </div>
              <span className="flex items-center z-10 justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 ring-2 ring-white ">
                <p className="text-3xl mt-1"> ☀ </p>
              </span>
              <div className="flex flex-col gap-0 w-28">
                <p className="text-base text-slate-500">
                  {dateInfo.arrvalNapEnd}
                </p>
                <h4 className="text-xl font-medium text-slate-700">기상!</h4>
              </div>
            </li>
            <li role="article" className="flex gap-2">
              <div className="flex flex-col w-28 text-right mt-5">
                <p className="text-base text-slate-500">
                  {dateInfo.departEndDate}
                </p>
              </div>
              <span className="flex items-center z-10 mt-5 justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 ring-2 ring-white ">
                <p className="text-3xl ml-1 rotate-45"> ✈︎ </p>
              </span>
              <div className="flex flex-col gap-0 w-28">
                <p className="text-xl text-slate-700 h-5">ㅤ</p>
                <p className="text-base text-slate-500">
                  {dateInfo.arrivalEndDate}
                </p>
                <h4 className="text-xl text-slate-700 whitespace-pre-line">
                  {/* {dateInfo.arrivalCity} */}
                  도착
                </h4>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default RecommendNap;
