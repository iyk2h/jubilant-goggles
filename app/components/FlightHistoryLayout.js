import React, { useState } from "react";
import FlightInfoDisplay from "./FlightInfoLayout";
import MyButton from "./MyButton";

const FlightHistoryLayout = ({ history }) => {
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
      <h2 className="text-2xl font-bold text-teal-900">최근 검색 기록</h2>
      {history.slice(visibleItems, visibleItems + gap).map((info, index) => (
        <div className="py-2" key={index}>
          <FlightInfoDisplay
            flightInfo={info}
            onConfirm={() => {}}
            text="선택"
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
