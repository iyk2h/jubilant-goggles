import React, { useState } from "react";
import MyButton from "./MyButton";
import RecentViewsLayout from "./RecentViewsLayout";

const RecentViews = ({
  history,
  onConfirm,
  onClickTitle,
  hover = true,
  onRemove,
}) => {
  const gap = 6;

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
          <RecentViewsLayout
            flightInfo={info.response}
            onConfirm={() => onConfirm(info.key, info.response)}
            text={onClickTitle}
            hover={hover}
            flight_num={`${info.key.split("_")[1]}, ${info.key.split("_")[2]}`}
            onRemove={() => onRemove(info.key)}
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

export default RecentViews;
