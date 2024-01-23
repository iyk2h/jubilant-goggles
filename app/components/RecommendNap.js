import { useEffect, useState } from "react";

import {
  SleepIcon,
  WakeUpIcon,
  NoCoffee,
  AirplaneDepartIcon,
  AirplaneArrivalIcon,
} from "../utils/icon/Icon";
import RecommendNapLayout from "./RecommendNapLayout";
import {
  formatDate,
  getDiffTime,
  formatDateString,
  formatStrS,
} from "../utils/DateUtils";
import { useTranslations, useLocale } from "next-intl";
import RecommendSleepLayout from "./RecommendSleepLayout";

const RecommendNap = ({ title, airportInfos }) => {
  const t = useTranslations("Result");
  const locale = useLocale();

  const [recommendNapItems, setRecommendNapItems] = useState([]);
  const [departSleep, setDepartSleep] = useState([]);
  const [arrivalSleep, setArrivalSleep] = useState([]);

  useEffect(() => {
    if (airportInfos) {
      /// recommend nap

      const items = [];

      airportInfos.map((airportInfo, index) => {
        const departureInfo = airportInfo.departureInfo;
        const arrivalInfo = airportInfo.arrivalInfo;

        const departDateForm = formatDate(departureInfo);
        const arrivalDateForm = formatDate(arrivalInfo);

        const flightTime = getDiffTime(arrivalDateForm.diff(departDateForm));

        const arrivalStartDateForm = arrivalDateForm.minus(flightTime);
        const departEndDateForm = departDateForm.plus(flightTime);

        const departStartDate = formatDateString(departDateForm, locale);
        const departEndDate = formatDateString(departEndDateForm, locale);
        const arrivalStartDate = formatDateString(arrivalStartDateForm, locale);
        const arrivalEndDate = formatDateString(arrivalDateForm, locale);

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
        }

        startNap = Math.round(startNap / 10) * 10;
        endNap = Math.floor(endNap / 10) * 10;

        if (index === 0) {
          // pre flight sleep tips
          let dpSleepItem = [];

          const dt = formatDate(airportInfos[0].departureInfo);
          let sleep = dt.startOf("day");
          let wakeup = dt.startOf("day").plus({ hours: 9 });

          // 07 : 00 < dt < 13:00
          // d-day
          if (dt.hour > 7 && dt.hour < 13) {
            // wakeup : dt - 4h
            wakeup = dt.minus({ hours: 4 });
            // sleep : 24:00 - ( (09:00 - wakeup) / 2 )
            const t = Math.round((9 - wakeup.hour) / 2);
            sleep = sleep.minus({ hours: t });
          }

          dpSleepItem.push({
            departDateTime: formatDateString(sleep, locale),
            departDescription: t("sleep"),
            arrivalDateTime: "",
            arrivalDescription: "",
            icon: <SleepIcon />,
          });

          dpSleepItem.push({
            departDateTime: formatDateString(wakeup, locale),
            departDescription: t("wake_up"),
            arrivalDateTime: "",
            arrivalDescription: "",
            icon: <WakeUpIcon />,
          });

          let stopCaffein = "";
          if (
            wakeup >
            departDateForm.plus({ minutes: startNap }).minus({ hours: 8 })
          ) {
            stopCaffein = formatDateString(wakeup, locale);
          } else {
            stopCaffein = formatDateString(
              departDateForm.plus({ minutes: startNap }).minus({ hours: 8 }),
              locale
            );
          }
          if (stopCaffein != "") {
            dpSleepItem.push({
              departDateTime: stopCaffein,
              departDescription: "",
              arrivalDateTime: t("no_coffee_msg"),
              arrivalDescription: "",
              icon: <NoCoffee />,
            });
          }

          setDepartSleep([
            { info: { city: airportInfos[0].departureInfo.city }, dpSleepItem },
          ]);
        }

        const departNapStart = formatDateString(
          departDateForm.plus({ minutes: startNap }),
          locale
        );
        const departNapEnd = formatDateString(
          departDateForm.plus({ minutes: endNap }),
          locale
        );
        const arrvalNapStart = formatDateString(
          arrivalStartDateForm.plus({ minutes: startNap }),
          locale
        );
        const arrvalNapEnd = formatDateString(
          arrivalStartDateForm.plus({ minutes: endNap }),
          locale
        );

        const info = {
          departCity: departureInfo.city,
          arrivalCity: arrivalInfo.city,
        };

        const recommendItems = [];

        recommendItems.push({
          departDateTime: departStartDate,
          departDescription: t("departure"),
          arrivalDateTime: arrivalStartDate,
          arrivalDescription: "",
          icon: <AirplaneDepartIcon />,
        });

        recommendItems.push({
          departDateTime: departNapStart,
          departDescription: "",
          arrivalDateTime: arrvalNapStart,
          arrivalDescription: t("nap"),
          icon: <SleepIcon />,
        });

        recommendItems.push({
          departDateTime: departNapEnd,
          departDescription: "",
          arrivalDateTime: arrvalNapEnd,
          arrivalDescription: t("wake_up"),
          icon: <WakeUpIcon />,
        });

        recommendItems.push({
          departDateTime: departEndDate,
          departDescription: "",
          arrivalDateTime: arrivalEndDate,
          arrivalDescription: t("arrival"),
          icon: <AirplaneArrivalIcon />,
        });

        items.push({ info, recommendItems });
      });

      setRecommendNapItems(items);

      // recommend arrival sleep
      let arSleepItem = [];

      const ar = formatDate(airportInfos[airportInfos.length - 1].arrivalInfo);
      let arsleept = ar.plus({ days: 1 }).startOf("day");
      let arwakeupt = ar.plus({ days: 1 }).startOf("day").plus({ hours: 9 });

      if (ar.hour >= 22 || ar.hour < 6) {
        arsleept.minus({ hours: 2 });
      } else if (ar.hour >= 6 && ar.hour < 14) {
        arsleept.minus({ hours: 3 });
      } else {
        arsleept.minus({ hours: 4 });
      }

      let stopCaffein = "";
      const lastArrivalTime = formatDate(
        airportInfos[airportInfos.length - 1].arrivalInfo
      );
      if (lastArrivalTime > arsleept.minus({ hours: 8 })) {
        stopCaffein = formatDateString(lastArrivalTime, locale);
      } else {
        stopCaffein = formatDateString(arsleept.minus({ hours: 8 }), locale);
      }
      if (stopCaffein != "") {
        arSleepItem.push({
          departDateTime: t("no_coffee_msg"),
          departDescription: "",
          arrivalDateTime: stopCaffein,
          arrivalDescription: "",
          icon: <NoCoffee />,
        });
      }

      arSleepItem.push({
        departDateTime: "",
        departDescription: "",
        arrivalDateTime: formatDateString(arsleept, locale),
        arrivalDescription: t("sleep"),
        icon: <SleepIcon />,
      });

      arSleepItem.push({
        departDateTime: "",
        departDescription: "",
        arrivalDateTime: formatDateString(arwakeupt, locale),
        arrivalDescription: t("wake_up"),
        icon: <WakeUpIcon />,
      });

      setArrivalSleep([
        {
          info: {
            city: airportInfos[airportInfos.length - 1].arrivalInfo.city,
          },
          arSleepItem,
        },
      ]);
    }
  }, [airportInfos]);

  return (
    <>
      <div className="mt-5">
        <div className="flex justify-between items-center">
          <div>{title.split("_")[1]}</div>
          <div className="text-sm">
            {formatStrS(title.split("_")[0], locale)}
          </div>
        </div>

        {/* <span>
          {airportInfos[0].departureInfo.city} {t("sleep_tips_msg")}
        </span> */}
        {departSleep.map((info, index) => (
          <RecommendSleepLayout
            key={index}
            idx={index}
            info={`${info.info.city} ${t("sleep_tips_msg")}`}
            recommendItems={info.dpSleepItem}
          />
        ))}

        {/* <span>비행 중 낮잠 정보</span> */}
        {recommendNapItems.map((info, index) => (
          <RecommendNapLayout
            key={index}
            idx={index}
            info={info.info}
            recommendItems={info.recommendItems}
          />
        ))}

        {/* <span>
          
        </span> */}
        {arrivalSleep.map((info, index) => (
          <RecommendSleepLayout
            key={index}
            idx={airportInfos.length}
            info={`${airportInfos[airportInfos.length - 1].arrivalInfo.city}
            ${t("sleep_tips_msg")}`}
            recommendItems={info.arSleepItem}
          />
        ))}
      </div>
    </>
  );
};

export default RecommendNap;
