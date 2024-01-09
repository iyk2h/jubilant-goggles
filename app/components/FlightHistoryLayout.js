import React, { useState } from "react";
import FlightInfoDisplay from "./FlightInfoLayout";
import MyButton from "./MyButton";

const FlightHistoryLayout = ({ history, onConfirm, onClickTitle }) => {
  const gap = 4;

  const [visibleItems, setVisibleItems] = useState(0);

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + gap);
  };

  const loadLessItems = () => {
    setVisibleItems((prevVisibleItems) => Math.max(0, prevVisibleItems - gap));
  };

  const showNextButton = visibleItems + gap < history.length;
  const showPreviousButton = visibleItems > 0;

  return (
    <div>
      {history.slice(visibleItems, visibleItems + gap).map((info, index) => (
        <div className="py-2" key={index}>
          <FlightInfoDisplay
            flightInfo={info.response}
            onConfirm={() => onConfirm(info.key, info.response)}
            text={onClickTitle}
          />
        </div>
      ))}
      <div className="flex justify-between">
        {showPreviousButton ? (
          <div className="flex items-start">
            <MyButton text={"이전"} onClick={loadLessItems} />
          </div>
        ) : (
          <div></div>
        )}
        {showNextButton ? (
          <div className="flex items-end">
            <MyButton text={"다음"} onClick={loadMoreItems} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default FlightHistoryLayout;
