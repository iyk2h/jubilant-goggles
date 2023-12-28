"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useMemo, useContext } from "react";

const FlightsValueContext = createContext();
const FlightsActionsContext = createContext();

export default function RootLayout({ children }) {
  const router = useRouter();
  const [flights, setFlights] = useState([]);
  const actions = useMemo(() => ({
    addFlight(key, response) {
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
