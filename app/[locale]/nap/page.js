"use client";

import { useAirportInfosValue } from "../AirportProvider";
import RecommendNap from "../../components/RecommendNap";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function Nap() {
  const airportInfos = useAirportInfosValue();

  const router = useRouter();
  useEffect(() => {
    if (airportInfos && airportInfos.length === 0) {
      router.push("/");
    }
  }, [airportInfos, router]);

  return (
    <>
      <RecommendNap airportInfos={airportInfos} />
    </>
  );
}
