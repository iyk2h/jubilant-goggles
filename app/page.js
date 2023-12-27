"use client";

import FlightInfo from "./components/FlightInfo";
import RecommendNap from "./components/RecommendNap";

export default function Home() {
  return (
    <div>
      <FlightInfo />

      <RecommendNap
        airportInfos={[
          {
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
          },
          {
            departureInfo: {
              name: "Issyk-Kul",
              city: "Kuala Lumpur",
              timezone: "Asia/Bishkek",
              datetime: "12/17/2023, 3:20:00 PM",
            },
            arrivalInfo: {
              name: "Seoul Incheon International",
              city: "Seoul",
              timezone: "Asia/Seoul",
              datetime: "12/18/2023, 7:35:00 AM",
            },
          },
        ]}
      />
    </div>
  );
}
