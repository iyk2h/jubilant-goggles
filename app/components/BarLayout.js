const { DateTime } = require("luxon");
import { CoffeeIcon, BedIcon, AirplaneIcon } from "./Icon";

export const airplainLayout = (startDateTime, endDateTime, curDateTime) => {
  const start = formatDate(startDateTime);
  const end = formatDate(endDateTime);

  if (start.toFormat("dd HH:mm") != curDateTime.toFormat("dd HH:mm")) {
    return <></>;
  }

  const listItems = [];

  const addPlaneIcon = (key) => (
    <div key={key} className="relative z-10">
      <AirplaneIcon />
    </div>
  );

  const addLine = (key) => (
    <div key={key} className="relative z-10">
      <div
        style={{
          content: "''",
          position: "absolute",
          width: "1px",
          height: `26px`,
          backgroundColor: "gray",
          zIndex: 0,
          marginLeft: "11.5px",
        }}
      ></div>
      ㅤ
    </div>
  );

  let currentDay = start.toFormat("EEE, MMM dd");

  listItems.push(addPlaneIcon(start.toMillis()));

  for (
    let curDateTime = start.plus({ hours: 1 });
    curDateTime <= end.minus({ hours: 1 });
    curDateTime = curDateTime.plus({ hours: 1 })
  ) {
    const currentHourDay = curDateTime.toFormat("EEE, MMM dd");

    if (currentDay !== currentHourDay) {
      listItems.push(addLine(curDateTime.toMillis() + 1));
      currentDay = currentHourDay;
    }
    listItems.push(addLine(curDateTime.toMillis()));
  }

  listItems.push(addPlaneIcon(end.toMillis()));

  return listItems;
};

export const caffeineLayout = (
  startDateTime,
  endDateTime,
  drink,
  curDateTime
) => {
  const start = formatDate(startDateTime);
  const end = formatDate(endDateTime);

  if (start.toFormat("dd HH:mm") != curDateTime.toFormat("dd HH:mm")) {
    return <></>;
  }

  let addCoffeeIcon;
  let addLine;
  let addEndLine;

  const listItems = [];
  if (drink) {
    addCoffeeIcon = (key) => (
      <div
        key={key}
        className="relative z-10 rounded-t-full flex items-center justify-center bg-amber-800 border-x-2 border-amber-800"
      >
        <CoffeeIcon color="#fdba74" />
      </div>
    );

    addLine = (key) => (
      <div
        key={key}
        className="bg-amber-800 text-center border-x-2 border-amber-800"
      >
        ㅤ
      </div>
    );

    addEndLine = (key) => (
      <div
        key={key}
        className="rounded-b-full flex items-center justify-center bg-amber-800"
      >
        ㅤ
      </div>
    );
  } else {
    const lineStyle = {
      content: "''",
      position: "absolute",
      width: "32px",
      height: `27px`,
      borderBottom: "2px solid #92400e",
      transform: "rotate(-45deg)",
      transformOrigin: "bottom left",
      zIndex: 1,
      marginLeft: "8px",
    };
    addCoffeeIcon = (key) => (
      <div
        key={key}
        className="relative z-10 rounded-t-full flex items-center justify-center border-x-2 border-t-2 border-amber-800"
      >
        <CoffeeIcon />
        <div className="" style={lineStyle}></div>
      </div>
    );
    addLine = (key) => (
      <div key={key} className="text-center border-x-2 border-amber-800">
        ㅤ
      </div>
    );

    addEndLine = (key) => (
      <div
        key={key}
        className="rounded-b-full flex items-center justify-center border-x-2 border-b-2 border-amber-800"
      >
        ㅤ
      </div>
    );
  }

  listItems.push(addCoffeeIcon(start.toMillis()));
  let currentDay = start.toFormat("EEE, MMM dd");

  for (
    let curDateTime = start.plus({ hours: 1 });
    curDateTime <= end;
    curDateTime = curDateTime.plus({ hours: 1 })
  ) {
    const currentHourDay = curDateTime.toFormat("EEE, MMM dd");

    if (curDateTime.equals(end)) {
      listItems.push(addEndLine(curDateTime.toMillis()));
    } else {
      listItems.push(addLine(curDateTime.toMillis()));
    }

    if (currentDay !== currentHourDay) {
      listItems.push(addLine(curDateTime.toMillis() + 1));
      currentDay = currentHourDay;
    }
  }

  return listItems;
};

export const bedLayout = (startDateTime, endDateTime, curDateTime) => {
  const start = formatDate(startDateTime);
  const end = formatDate(endDateTime);

  if (start.toFormat("dd HH:mm") != curDateTime.toFormat("dd HH:mm")) {
    return <></>;
  }

  const listItems = [];

  const addBedIcon = (key) => (
    <div
      key={key}
      className="relative z-10 rounded-t-full flex items-center justify-center bg-indigo-950 border-x-2 border-indigo-950"
    >
      <BedIcon />
    </div>
  );

  const addLine = (key) => (
    <div
      key={key}
      className="bg-indigo-950 text-center border-x-2 border-indigo-950"
    >
      ㅤ
    </div>
  );

  const addEndLine = (key) => (
    <div
      key={key}
      className="rounded-b-full flex items-center justify-center bg-indigo-950"
    >
      ㅤ
    </div>
  );

  listItems.push(addBedIcon(start.toMillis()));
  let currentDay = start.toFormat("EEE, MMM dd");

  for (
    let curDateTime = start.plus({ hours: 1 });
    curDateTime <= end;
    curDateTime = curDateTime.plus({ hours: 1 })
  ) {
    const currentHourDay = curDateTime.toFormat("EEE, MMM dd");

    if (curDateTime.equals(end)) {
      listItems.push(addEndLine(curDateTime.toMillis()));
    } else {
      listItems.push(addLine(curDateTime.toMillis()));
    }

    if (currentDay !== currentHourDay) {
      listItems.push(addLine(curDateTime.toMillis() + 1));
      currentDay = currentHourDay;
    }
  }

  return listItems;
};

const formatDate = (info) => {
  return DateTime.fromFormat(info.datetime, "MM/d/yyyy, h:mm:ss a").setZone(
    info.timezone,
    {
      keepLocalTime: true,
    }
  );
};
