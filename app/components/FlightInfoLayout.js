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
      className="bg-gray-100 hover:bg-gray-300 rounded-xl cursor-pointer"
      onClick={onConfirm}
    >
      <div className="flex justify-center">
        <div className="text-center w-2/5">
          <p className="text-5xl">{departureAirportCode}</p>
          <p className="text-xl">{departureCity}</p>
          <p className="text-base mt-1">{departureTime}</p>
        </div>
        <div className="text-center w-1/5">
          <p className="text-3xl mt-2"> ✈︎ </p>
          <p className="text-2xl text-teal-900">{text}</p>
        </div>
        <div className="text-center w-2/5">
          <p className="text-5xl">{arrivalAirportCode}</p>
          <p className="text-xl">{arrivalCity}</p>
          <p className="text-base mt-1">{arrivalTime}</p>
        </div>
      </div>
    </div>
  );
};

export default FlightInfoLayout;
