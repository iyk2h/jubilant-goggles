"use client";

import { useEffect, useState } from "react";
import { AirplaneDepartIcon, PlusIcon } from "./utils/icon/Icon";
import { useRouter } from "next/navigation";
import { useAirportInfosActions } from "./AirportProvider";
import { formatStrS, nowDate, formatDate } from "./utils/DateUtils";

export default function Home() {
  const router = useRouter();

  const [airportInfos, setAirports] = useState([]);
  const nowDateTime = nowDate();

  useEffect(() => {
    const storedAirports = localStorage.getItem("airportInfos");
    const afterToday = [];

    if (storedAirports) {
      const parsedAirports = JSON.parse(storedAirports);

      parsedAirports.forEach((info, index) => {
        const lastDateTime = formatDate(
          info.airport[info.airport.length - 1].arrivalInfo
        );
        if (lastDateTime > nowDateTime) {
          afterToday.push(info);
        }
      });

      setAirports(afterToday);
    }
  }, []);

  const { setAirportInfo } = useAirportInfosActions();

  const clickHandle = (param) => {
    setAirportInfo(param);
    router.push("/nap");
  };

  return (
    <div>
      {airportInfos.length !== 0 ? (
        <>
          {airportInfos.map((info, index) => {
            const lastDateTime = formatDate(
              info.airport[info.airport.length - 1].arrivalInfo
            );

            const nowDateTime = nowDate();

            return (
              <div
                id={`view_detail_${index}`}
                key={index}
                className="flex justify-center bg-gray-100 rounded-xl m-2 mx-20 text-center cursor-pointer"
                onClick={() => clickHandle(info.airport)}
              >
                {lastDateTime > nowDateTime && (
                  <>
                    {info.key.split("_")[2]}
                    <br />
                    {formatStrS(info.key.split("_")[0])}
                  </>
                )}
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div className="py-8 mx-10 m-5 text-center text-lg bg-gray-100 rounded-xl">
            아래 버튼을 클릭해 여행을 등록해보세요. <br />
            여행 별 낮잠 추천을 받을 수 있습니다.
          </div>
        </>
      )}

      <div
        id="add_flight"
        className="flex justify-center bg-gray-300 rounded-xl p-2 mx-20  mb-20 cursor-pointer"
        onClick={() => {
          router.push("/flights");
        }}
      >
        <div id="add_flight_icons" className="flex justify-normal items-center">
          <div>
            <AirplaneDepartIcon id={"add_flight_icons_airport_img"} />
          </div>
          <div>
            <PlusIcon id={"add_flight_icons_plus"} />
          </div>
        </div>
      </div>
    </div>
  );
}
