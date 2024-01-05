"use client";

import { useEffect, useState } from "react";
import { AirplaneDepartIcon, PlusIcon, TrashIcon } from "./utils/icon/Icon";
import { useRouter } from "next/navigation";
import { useAirportInfosActions } from "./AirportProvider";
import { formatStrS, nowDate, formatDate } from "./utils/DateUtils";
import { Yeon_Sung } from "next/font/google";

const yeonSung = Yeon_Sung({
  weight: "400",
  subsets: ["latin"],
});

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

  const clearAirportHistory = () => {
    localStorage.removeItem("airportInfos");
    setAirports([]);
    router.refresh();
  };

  return (
    <div>
      {airportInfos.length !== 0 ? (
        <>
          {airportInfos.map((info, index) => {
            return (
              <div
                id={`view_detail_${index}`}
                key={index}
                className="flex justify-center bg-gray-100 rounded-xl p-2 my-2 mx-10 text-base text-center cursor-pointer"
                onClick={() => clickHandle(info.airport)}
              >
                <>
                  {info.key.split("_")[2]}
                  <br />
                  {formatStrS(info.key.split("_")[0])}
                </>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div
            className={`py-8 px-5 m-2 text-center text-base bg-gray-100 rounded-xl`}
          >
            아래 버튼을 클릭해 여행을 등록해보세요. <br />
            여행 별 낮잠 추천을 받을 수 있습니다.
          </div>
        </>
      )}

      <div className="flex justify-between m-5  mx-20  mb-20">
        {airportInfos.length !== 0 && (
          <div
            id="clear_airport_his"
            className="flex justify-center items-center w-10 bg-gray-300 rounded-xl mx-1 px-1 cursor-pointer"
            onClick={clearAirportHistory}
          >
            <TrashIcon />
          </div>
        )}
        <div
          id="add_flight"
          className="flex justify-center w-full bg-gray-300 rounded-xl p-2 cursor-pointer"
          onClick={() => {
            router.push("/flights");
          }}
        >
          <div
            id="add_flight_icons"
            className="flex justify-normal items-center"
          >
            <div>
              <AirplaneDepartIcon id={"add_flight_icons_airport_img"} />
            </div>
            <div>
              <PlusIcon id={"add_flight_icons_plus"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
