import { useEffect, useState } from "react";

import {
  SleepIcon,
  WakeUpIcon,
  NoCoffee,
  AirplaneDepartIcon,
  AirplaneArrivalIcon,
} from "../utils/icon/Icon";
import RecommendNapLayout from "./RecommendNapLayout";
import { formatDate, getDiffTime, formatDateString } from "../utils/DateUtils";

const RecommendNap = ({ airportInfos }) => {
  const [recommendNapItems, setRecommendNapItems] = useState([]);

  useEffect(() => {
    if (airportInfos) {
      const items = [];

      airportInfos.map((airportInfo, index) => {
        const departureInfo = airportInfo.departureInfo;
        const arrivalInfo = airportInfo.arrivalInfo;

        console.log(departureInfo);

        const departDateForm = formatDate(departureInfo);
        const arrivalDateForm = formatDate(arrivalInfo);
        const flightTime = getDiffTime(arrivalDateForm.diff(departDateForm));
        const departEndDateForm = departDateForm.plus(flightTime);
        const arrivalStartDateForm = arrivalDateForm.minus(flightTime);

        const departStartDate = formatDateString(departDateForm);
        const departNapStart = formatDateString(
          departDateForm.plus({ hour: 1 })
        );
        const departNapEnd = formatDateString(
          departEndDateForm.minus({ hour: 1 })
        );
        const departEndDate = formatDateString(departEndDateForm);
        const arrivalStartDate = formatDateString(arrivalStartDateForm);
        const arrvalNapStart = formatDateString(
          arrivalStartDateForm.plus({ hour: 1 })
        );
        const arrvalNapEnd = formatDateString(
          arrivalDateForm.minus({ hour: 1 })
        );
        const arrivalEndDate = formatDateString(arrivalDateForm);
        const stopCaffein = formatDateString(
          arrivalStartDateForm.minus({ hours: 8 })
        );

        const info = {
          departCity: departureInfo.city,
          arrivalCity: arrivalInfo.city,
        };

        const recommendItems = [];

        if (index === 0) {
          recommendItems.push({
            departDateTime: stopCaffein,
            departDescription: "지금부터 커피 금지",
            arrivalDateTime: "",
            arrivalDescription: "",
            icon: <NoCoffee />,
          });
        }

        recommendItems.push({
          departDateTime: departStartDate,
          departDescription: "출발",
          arrivalDateTime: arrivalStartDate,
          arrivalDescription: "",
          icon: <AirplaneDepartIcon />,
        });

        recommendItems.push({
          departDateTime: departNapStart,
          departDescription: "",
          arrivalDateTime: arrvalNapStart,
          arrivalDescription: "낮잠!",
          icon: <SleepIcon />,
        });

        recommendItems.push({
          departDateTime: departNapEnd,
          departDescription: "",
          arrivalDateTime: arrvalNapEnd,
          arrivalDescription: "기상!",
          icon: <WakeUpIcon />,
        });

        recommendItems.push({
          departDateTime: departEndDate,
          departDescription: "",
          arrivalDateTime: arrivalEndDate,
          arrivalDescription: "도착!",
          icon: <AirplaneArrivalIcon />,
        });

        items.push({ info, recommendItems });
      });

      setRecommendNapItems(items);
    }
  }, [airportInfos]);

  return (
    <>
      <div className="mt-5 mb-20">
        {recommendNapItems.map((info, index) => (
          <RecommendNapLayout
            key={index}
            idx={index}
            info={info.info}
            recommendItems={info.recommendItems}
          />
        ))}
        <div className="text-right text-slate-400">
          icon by <a href="https://icons8.com">Icons8</a>
        </div>
      </div>
    </>
  );
};

export default RecommendNap;
