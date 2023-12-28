"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useMemo, useContext } from "react";
import { formatStringToDate } from "../utils/DateUtils";

const FlightsValueContext = createContext();
const FlightsActionsContext = createContext();

export default function RootLayout({ children }) {
  const router = useRouter();
  const [flights, setFlights] = useState([]);
  const actions = useMemo(() => ({
    addFlight(key, response) {
      const isDuplicate = flights.some((flight) => flight.key === key);
      if (isDuplicate) {
        alert("이미 선택한 비행입니다.");
        return;
      }

      const lastFlight =
        flights.length > 0 ? flights[flights.length - 1] : null;
      if (
        lastFlight &&
        lastFlight.response.arrivalCity !== response.departureCity
      ) {
        alert("선택한 비행의 출발지가 직전 비행의 도착지가 같지 않습니다.");
        return;
      }

      const year = new Date().getFullYear();
      const lastDate = new Date(`${lastFlight.response.arrivalTime}, ${year}`);
      const newDate = new Date(`${response.departureTime}, ${year}`);
      if (lastFlight && lastDate > newDate) {
        alert(
          "선택한 비행의 출발 시간이 직전 비행의 도착 시간보다 빠를 수 없습니다."
        );
        return;
      }

      const newFlights = [...flights, { key, response }];
      setFlights(newFlights);
      router.replace("/flights");
    },
    removeFlight(key) {
      const updatedFlights = flights.filter((flight) => flight.key !== key);
      setFlights(updatedFlights);
    },
  }));

  return (
    <FlightsActionsContext.Provider value={actions}>
      <FlightsValueContext.Provider value={flights}>
        {children}
      </FlightsValueContext.Provider>
    </FlightsActionsContext.Provider>
  );
}

export function useFlightsValue() {
  const value = useContext(FlightsValueContext);
  if (value === undefined) {
    throw new Error("useFlightValue should be used within FlightProvider");
  }
  return value;
}

export function useFlightsActions() {
  const value = useContext(FlightsActionsContext);
  if (value === undefined) {
    throw new Error("useFlightsActions should be used within FlightsActions");
  }
  return value;
}
