"use client";

import FlightHistoryLayout from "../components/FlightHistoryLayout";
import MyButton from "../components/MyButton";
import { useRouter } from "next/navigation";
import { useFlightsValue } from "./layout";

export default function Flights() {
  const router = useRouter();

  const flights = useFlightsValue();

  const cancelHandle = () => {
    router.back();
  };

  return (
    <div className="px-4">
      <section>
        {flights ? (
          <div>
            <FlightHistoryLayout title={"flights"} history={flights} />
          </div>
        ) : (
          <></>
        )}
        {flights.length <= 3 ? (
          <div
            className=" bg-gray-100 text-center py-3 my-3 rounded-xl text-lg cursor-pointer"
            onClick={() => {
              router.push("/flights/input");
            }}
          >
            비행 추가 하기
          </div>
        ) : (
          <></>
        )}
      </section>
      <section className="flex justify-between my-3">
        <div className="flex items-start">
          <MyButton
            text={"취소"}
            onClick={() => {
              cancelHandle();
            }}
          />
        </div>
        <div className="flex items-end">
          <MyButton text={"확인"} onClick={() => {}} />
        </div>
      </section>
    </div>
  );
}
