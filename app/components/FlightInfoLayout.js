import React from "react";

const FlightInfoLayout = ({ flightInfo, onConfirm, text, hover }) => {
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
      className={`bg-gray-100 rounded-xl  p-1 ${
        hover ? "hover:bg-gray-300 cursor-pointer" : ""
      }`}
      onClick={onConfirm}
    >
      <div className="flex justify-center">
        <div className="text-center w-2/5">
          <p className="text-2xl">{departureAirportCode}</p>
          <p className="text-xs">{departureCity}</p>
          <p className="text-sm mt-1">{departureTime}</p>
        </div>
        <div className="text-center w-1/5">
          <p className="text-xl mt-4"> ✈︎ </p>
        </div>
        <div className="text-center w-2/5">
          <p className="text-2xl">{arrivalAirportCode}</p>
          <p className="text-xs">{arrivalCity}</p>
          <p className="text-sm mt-1">{arrivalTime}</p>
        </div>
        {text && (
          <div className="flex items-center rotate-180 mr-1">{text}</div>
        )}
      </div>
    </div>
  );
};

export default FlightInfoLayout;
