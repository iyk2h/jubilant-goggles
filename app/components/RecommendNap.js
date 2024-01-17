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

const RecommendNap = ({ title, airportInfos }) => {
  const t = useTranslations("Result");
  const locale = useLocale();

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

        if (index === 0) {
          setStopCaffein(
            formatDateString(
              departDateForm.plus({ minutes: startNap }).minus({ hours: 8 }),
              locale
            )
          );
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
            {locale === "ko" ? (
              <span className="ml-2 text-sm">
                {t("no_coffee_msg_1")}
                <br />
                {stopCaffein} {t("no_coffee_msg_2")}
              </span>
            ) : (
              <span className="ml-2 text-sm">
                {t("no_coffee_msg_1")} {stopCaffein}
                <br /> {t("no_coffee_msg_2")}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RecommendNap;
