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
  const [stopCaffein, setStopCaffein] = useState();

  const [recommendNapItems, setRecommendNapItems] = useState([]);

  useEffect(() => {
    if (airportInfos) {
      const items = [];

      airportInfos.map((airportInfo, index) => {
        const departureInfo = airportInfo.departureInfo;
        const arrivalInfo = airportInfo.arrivalInfo;

        const departDateForm = formatDate(departureInfo);
        const arrivalDateForm = formatDate(arrivalInfo);

        const flightTime = getDiffTime(arrivalDateForm.diff(departDateForm));

        const arrivalStartDateForm = arrivalDateForm.minus(flightTime);
        const departEndDateForm = departDateForm.plus(flightTime);

        const departStartDate = formatDateString(departDateForm);
        const departEndDate = formatDateString(departEndDateForm);
        const arrivalStartDate = formatDateString(arrivalStartDateForm);
        const arrivalEndDate = formatDateString(arrivalDateForm);

        let startNap = "";
        let endNap = "";
        if (flightTime.minutes >= 300) {
          // 비행시간 5시간 이상
          if (arrivalDateForm.hour < 10 || arrivalDateForm.hour > 22) {
            // Late night or early morning arrival
            startNap = flightTime.minutes * 0.1;
            endNap = flightTime.minutes * 0.9;
          } else if (arrivalDateForm.hour >= 10 && arrivalDateForm.hour < 16) {
            // Afternoon arrival
            startNap = flightTime.minutes * 0.6;
            endNap = flightTime.minutes * 0.9;
          } else if (arrivalDateForm.hour >= 16 && arrivalDateForm.hour < 22) {
            // Evening arrival
            startNap = flightTime.minutes * 0.2;
            endNap = flightTime.minutes * 0.5;
          }
        } else {
          // 비행시간 5시간 이하
          if (arrivalDateForm.hour < 12) {
            // 오전 도착
            startNap = flightTime.minutes * 0.1;
            endNap = flightTime.minutes * 0.9;
          } else {
            // 오후 도착
            startNap = flightTime.minutes * 0.1;
            endNap = flightTime.minutes * 0.4;
          }
          console.log("min 5 hours flightTime", `${arrivalDateForm.hour}`);
        }

        if (index === 0) {
          setStopCaffein(
            formatDateString(
              departDateForm.plus({ minutes: startNap }).minus({ hours: 8 })
            )
          );
        }

        const departNapStart = formatDateString(
          departDateForm.plus({ minutes: startNap })
        );
        const departNapEnd = formatDateString(
          departDateForm.plus({ minutes: endNap })
        );
        const arrvalNapStart = formatDateString(
          arrivalStartDateForm.plus({ minutes: startNap })
        );
        const arrvalNapEnd = formatDateString(
          arrivalStartDateForm.plus({ minutes: endNap })
        );

        const info = {
          departCity: departureInfo.city,
          arrivalCity: arrivalInfo.city,
        };

        const recommendItems = [];

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
        {stopCaffein && (
          <div className="flex items-center my-2">
            <div className="bg-slate-200 w-fit p-2 rounded-full m-2">
              <NoCoffee />
            </div>
            <span className="ml-2 text-sm">
              출발 국가 기준
              <br />
              {stopCaffein} 부터 커피는 피하세요!
            </span>
          </div>
        )}
        <div className="text-xs text-right text-slate-400">
          icon by <a href="https://icons8.com">Icons8</a>
        </div>
      </div>
    </>
  );
};

export default RecommendNap;
