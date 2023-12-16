import { useEffect, useState } from "react";

import {
  SleepIcon,
  WakeUpIcon,
  NoCoffee,
  AirplaneDepartIcon,
  AirplaneArrivalIcon,
} from "./Icon";
import RecommendNapLayout from "./RecommendNapLayout";
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

  const info = {
    departCity: "seoul",
    arrivalCity: "Kuala Lumpur",
  };

  const [recommendItems, setRecommendItems] = useState([
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
  ]);

  return (
    <>
      <RecommendNapLayout idx={1} info={info} recommendItems={recommendItems} />
    </>
  );
};

export default RecommendNap;
