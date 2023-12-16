"use client";

import FlightInfo from "./components/FlightInfo";
import MyHeader from "./components/MyHeader";
import RecommendNap from "./components/RecommendNap";

export default function Home() {
  return (
    <div className="container">
      <MyHeader headText="비행기 낮잠 가이드" />
      <FlightInfo />

      <RecommendNap
        airportInfo={{
          departureInfo: {
            name: "Seoul Incheon International",
            country: "Korea, Republic of",
            city: "Seoul",
            timezone: "Asia/Seoul",
            datetime: "12/17/2023, 7:35:00 AM",
          },
          arrivalInfo: {
            name: "Issyk-Kul",
            country: "Kyrgyzstan",
            city: "Kuala Lumpur",
            timezone: "Asia/Bishkek",
            datetime: "12/17/2023, 1:20:00 PM",
          },
        }}
      />

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding-left: 20px;
          padding-right: 20px;
          background-color: white;

          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }

        @media (min-width: 420px) {
          .container {
            width: 410px;
            min-width: 410px;
          }
        }

        @media (max-width: 400px) {
          .container {
            width: 95vw;
          }
        }
      `}</style>
    </div>
  );
}
