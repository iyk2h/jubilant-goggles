import React, { useState } from "react";
import { airplainLayout, caffeineLayout, bedLayout } from "./BarLayout";

const { DateTime } = require("luxon");

const Text = ({ airportInfo }) => {
  const [airport, setAirport] = useState([
    {
      departureInfo: {
        datetime: "12/15/2023, 9:00:00 PM",
      },
      arrivalInfo: {
        datetime: "12/16/2023, 1:00:00 AM",
      },
    },
  ]);

  const [coffeArr, setCoffeArr] = useState([
    {
      dringStartTime: {
        datetime: "12/15/2023, 9:00:00 AM",
      },
      dringEndTime: {
        datetime: "12/15/2023, 1:00:00 PM",
      },
      dirnkState: true,
    },
    {
      dringStartTime: {
        datetime: "12/15/2023, 2:00:00 PM",
      },
      dringEndTime: {
        datetime: "12/15/2023, 9:00:00 PM",
      },
      dirnkState: false,
    },
  ]);

  const [sleepArr, setSleepArr] = useState([
    {
      sleepTime: {
        datetime: "12/16/2023, :00:00 AM",
      },
      wakeUpTime: {
        datetime: "12/16/2023, :00:00 AM",
      },
    },
    {
      sleepTime: {
        datetime: "12/15/2023, 10:00:00 PM",
      },
      wakeUpTime: {
        datetime: "12/16/2023, 7:00:00 AM",
      },
    },
  ]);

  const [airport2, setAirport2] = useState([
    {
      departureInfo: {
        datetime: "12/15/2023, 10:00:00 PM",
      },
      arrivalInfo: {
        datetime: "12/16/2023, 7:00:00 AM",
      },
    },
  ]);

  airportInfo = {
    departureInfo: {
      name: "Seoul Incheon International",
      country: "Korea, Republic of",
      city: "Seoul",
      timezone: "Asia/Seoul",
      datetime: "12/15/2023, 7:00:00 AM",
    },
    arrivalInfo: {
      name: "Issyk-Kul",
      country: "Kyrgyzstan",
      city: "Kuala Lumpur",
      timezone: "Asia/Bishkek",
      datetime: "12/16/2023, 7:00:00 AM",
    },
  };

  const formatDate = (info) => {
    return DateTime.fromFormat(info.datetime, "MM/d/yyyy, h:mm:ss a").setZone(
      info.timezone,
      {
        keepLocalTime: true,
      }
    );
  };

  const timeLineDivs = (startDateTime, endDateTime) => {
    const divs = [];
    const start = formatDate(startDateTime);
    let end = formatDate(endDateTime);

    let currentDay = null;

    let hourDivs = [];
    for (
      let curDateTime = start;
      curDateTime <= end;
      curDateTime = curDateTime.plus({ hours: 1 })
    ) {
      const currentHourDay = curDateTime.toFormat("EEE, MMM dd");

      hourDivs.push(
        <div
          key={curDateTime.toMillis()}
          className="flex justify-between relative"
        >
          <div className=" w-11 text-center mr-1 pr-1 border-r-2 border-gray-400">
            {curDateTime.toFormat("HH:mm")}
          </div>
          <div className="relative flex-grow">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-400"></div>
            {
              <div className="flex justify-center gap-8">
                <div className="caffeineLayout relative z-10">
                  <div className=" absolute">
                    {caffeineLayout(
                      coffeArr[0].dringStartTime,
                      coffeArr[0].dringEndTime,
                      coffeArr[0].dirnkState,
                      curDateTime
                    )}
                  </div>
                  <div className=" absolute">
                    {caffeineLayout(
                      coffeArr[1].dringStartTime,
                      coffeArr[1].dringEndTime,
                      coffeArr[1].dirnkState,
                      curDateTime
                    )}
                  </div>
                </div>
                <div className="bedLayout  relative z-10">
                  <div className=" absolute">
                    {bedLayout(
                      sleepArr[0].sleepTime,
                      sleepArr[0].wakeUpTime,
                      curDateTime
                    )}
                  </div>
                  <div className=" absolute">
                    {bedLayout(
                      sleepArr[1].sleepTime,
                      sleepArr[1].wakeUpTime,
                      curDateTime
                    )}
                  </div>
                </div>
                <div className="airplainLayout relative z-10">
                  <div className=" absolute">
                    {airplainLayout(
                      airport2[0].departureInfo,
                      airport2[0].arrivalInfo,
                      curDateTime
                    )}
                  </div>
                </div>
              </div>
            }
          </div>
          <div className=" w-10 text-center pl-1 ml-1 border-l-2 border-gray-400">
            {curDateTime.plus({ hours: 4 }).toFormat("HH:mm")}
          </div>
        </div>
      );
      if (!currentDay || currentDay !== currentHourDay) {
        hourDivs = [];

        divs.push(
          <div key={currentDay}>
            <div className="bg-white relative z-10 rounded-md flex justify-center items-center">
              <div className="w-30 absolute left-0 text-center ml-2">
                {airportInfo.departureInfo.city}
              </div>
              <div className="text-center font-bold">{currentHourDay}</div>
              <div className="w-30 absolute right-0 text-end mr-2">
                {airportInfo.arrivalInfo.city}
              </div>
            </div>

            <div>{hourDivs}</div>
            <div className="relative flex-grow">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200"></div>
            </div>
          </div>
        );
        currentDay = currentHourDay;
      }
    }

    return divs;
  };

  const departureInfo = airportInfo.departureInfo;
  const arrivalInfo = airportInfo.arrivalInfo;

  const departDateForm = formatDate(departureInfo);
  const arrivalDateForm = formatDate(arrivalInfo);

  return (
    <div className="mt-4 mb-20">
      <div>{timeLineDivs(departureInfo, arrivalInfo)}</div>
    </div>
  );
};

export default Text;
