"use client";

import { useAirportInfosValue } from "../AirportProvider";
import RecommendNap from "../components/RecommendNap";
import { useRouter } from "next/navigation";

export default function Nap() {
  const airportInfos = useAirportInfosValue();
  const router = useRouter();

  if (airportInfos && airportInfos.length === 0) {
    router.replace("/");
  }

  return (
    <>
      <RecommendNap airportInfos={airportInfos} />
    </>
  );
}
