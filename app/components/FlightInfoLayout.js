import React from "react";

const FlightInfoLayout = ({ flightInfo, onConfirm, text }) => {
  const {
    departureAirportCode,
    departureCity,
    departureTime,
    arrivalAirportCode,
    arrivalCity,
    arrivalTime,
  } = flightInfo;

  return (
    <div
      className="bg-gray-100 hover:bg-gray-300 rounded-xl cursor-pointer p-1"
      onClick={onConfirm}
    >
      <div className="flex justify-center">
        <div className="text-center w-2/5">
          <p className="text-2xl">{departureAirportCode}</p>
          <p className="text-xs">{departureCity}</p>
          <p className="text-sm mt-1">{departureTime}</p>
        </div>
        <div className="text-center w-1/5">
          <p className="text-xl mt-2"> ✈︎ </p>
          <p className="text-base font-bold text-teal-900">{text}</p>
        </div>
        <div className="text-center w-2/5">
          <p className="text-2xl">{arrivalAirportCode}</p>
          <p className="text-xs">{arrivalCity}</p>
          <p className="text-sm mt-1">{arrivalTime}</p>
        </div>
      </div>
    </div>
  );
};

export default FlightInfoLayout;
