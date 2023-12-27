"use client";

import FlightInfo from "@/app/components/FlightInfo";
import { useFlightsActions } from "../layout";

export default function flightInputLayout() {
  const { addFlight } = useFlightsActions();

  return <FlightInfo addFlight={addFlight} />;
}
