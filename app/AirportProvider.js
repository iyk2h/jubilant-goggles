"use client";

import { createContext, useContext, useMemo, useState } from "react";

const AirportInfosValueContext = createContext();
const AirportInfosActionsContext = createContext();

export default function AirportInfosProvider({ children }) {
  const [airportInfos, setAirportInfos] = useState([]);
  const actions = useMemo(
    () => ({
      setAirportInfo(value) {
        setAirportInfos(value);
      },
    }),
    []
  );

  return (
    <AirportInfosActionsContext.Provider value={actions}>
      <AirportInfosValueContext.Provider value={airportInfos}>
        {children}
      </AirportInfosValueContext.Provider>
    </AirportInfosActionsContext.Provider>
  );
}

export function useAirportInfosValue() {
  const value = useContext(AirportInfosValueContext);
  if (value === undefined) {
    throw new Error("useAirportInfosValue should be used within Provider");
  }
  return value;
}

export function useAirportInfosActions() {
  const value = useContext(AirportInfosActionsContext);
  if (value === undefined) {
    throw new Error("useAirportInfosActions should be used within Provider");
  }
  return value;
}
