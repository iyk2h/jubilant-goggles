"use client";

import { useEffect, useState } from "react";
import { AirplaneDepartIcon, PlusIcon } from "./components/Icon";
import { useRouter } from "next/navigation";
import { useAirportInfosActions } from "./AirportProvider";

export default function Home() {
  const router = useRouter();

  const [airportInfos, setAirports] = useState([]);
  useEffect(() => {
    const storedAirports = localStorage.getItem("airportInfos");
    if (storedAirports) {
      setAirports(JSON.parse(storedAirports));
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
          {airportInfos.map((info, index) => (
            <div
              key={index}
              className="flex justify-center bg-gray-100 rounded-xl m-2 mx-20 text-center cursor-pointer"
              onClick={() => clickHandle(info.airport)}
            >
              {info.key.split("_")[1]}
              <br />
              {info.key.split("_")[0]}
            </div>
          ))}
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
        className="flex justify-center bg-gray-300 rounded-xl p-2 mx-20  mb-20 cursor-pointer"
        onClick={() => {
          router.push("/flights");
        }}
      >
        <div className="flex justify-normal items-center">
          <div>
            <AirplaneDepartIcon />
          </div>
          <div>
            <PlusIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
