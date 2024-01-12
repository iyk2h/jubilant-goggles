import React, { useEffect, useRef, useState } from "react";
import airlines from "../data/airlines.json";
import Image from "next/image";
import {
  AirplaneDepartIcon,
  CalendarOneIcon,
  CalendarsIcon,
  CloseIcon,
  EnterIcon,
} from "../utils/icon/Icon";
import { useRouter } from "next/navigation";
import {
  getDateForCalender,
  removeHyphens,
  getTomorrowDateForCalender,
} from "../utils/DateUtils";
import { useTranslations } from "next-intl";

import { Nanum_Gothic_Coding } from "next/font/google";

const nanum_Gothic_Coding = Nanum_Gothic_Coding({
  weight: "700",
  subsets: ["latin"],
});

const SearchFlight = ({
  code,
  num,
  departureDate,
  setCode,
  setNum,
  setDepartureDate,
}) => {
  const t = useTranslations("AddFlight");

  const [matchingValues, setMatchingValues] = useState([]);
  //   const [code, setCode] = useState("");
  //   const [num, setNum] = useState("");
  //   const [departureDate, setDepartureDate] = useState("");
  const [flag, setFlag] = useState(true);
  const dateInputRef = useRef(null);
  const flightNumRef = useRef(null);

  const [query, setQuery] = useState("");

  const today = getDateForCalender();
  const tomorrow = getTomorrowDateForCalender;

  const inputQuery = (input) => {
    setQuery(input);
  };

  useEffect(() => {
    if (query.length <= 2) {
      setCode("");
      setNum("");
    }
    const querySlice = query.slice(0, 2);
    const updatedFilteredPeople =
      querySlice === ""
        ? []
        : airlines.filter(
            (person) =>
              person.iata.startsWith(
                querySlice.toUpperCase().replace(/\s+/g, "")
              ) && person.iata.length === 2
          );

    setMatchingValues(updatedFilteredPeople);

    if (
      updatedFilteredPeople.length === 1 &&
      updatedFilteredPeople[0].iata === querySlice
    ) {
      setFlag(true);
      setCode(updatedFilteredPeople[0].iata);
      setNum(query.slice(2));
    }
    setOnly_en_num_flag(false);
  }, [query]);

  const [only_en_num_flag, setOnly_en_num_flag] = useState(false);

  const handleInputChange = (event) => {
    let inputValue = event.target.value.trim();

    const alphanumericRegex = /[^a-zA-Z0-9]/g;
    const isCheckEnNum = !alphanumericRegex.test(inputValue);

    setOnly_en_num_flag(!isCheckEnNum);

    let code = "";
    let num = "";

    if (inputValue.length === 1) {
      setFlag(false);
    }

    if (inputValue.length <= 2) {
      code = inputValue.replace(alphanumericRegex, "").toUpperCase();
    } else {
      code = inputValue
        .slice(0, 2)
        .replace(alphanumericRegex, "")
        .toUpperCase();

      if (flag) {
        num = inputValue.slice(2, 6).replace(/[^0-9]/g, "");
      }
    }

    inputQuery(code + num);
  };

  const [focusFlag, setFocusFlag] = useState(true);

  const handleEnterPress = (event) => {
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      if (query.length <= 2) {
        if (matchingValues.length > 0) {
          inputQuery(matchingValues[0].iata);
        } else {
          handleClick(query, num);
        }
      } else {
        handleClick(code, num);
      }
    }
  };

  const handleDateEnterPress = (event) => {
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      setDepartureDate(today);
    }
  };

  const handleClick = (value, num) => {
    if (value === "" || num === "") {
      flightNumRef.current.focus();
    } else {
      dateInputRef.current.focus();
      setFocusFlag(false);
      setDateFocus(true);
    }
    inputQuery(value + num);
  };

  useEffect(() => {
    flightNumRef.current.focus();
  }, []);

  useEffect(() => {
    if (departureDate !== "") {
      setDateFocus(false);
    }
  }, [departureDate]);

  const router = useRouter();

  const [dateFocus, setDateFocus] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          {!dateFocus ? t("add_flight") : t("date")}
        </div>
        <div
          className="flex p-1 mx-1 cursor-pointer rounded-full hover:bg-gray-200"
          onClick={() => {
            router.back();
          }}
        >
          <CloseIcon />
        </div>
      </div>

      <div
        className={`flex gap-2 mt-1 ${
          code !== "" && num !== "" && departureDate !== ""
            ? ""
            : "bg-gray-100 rounded-xl"
        }`}
      >
        {!focusFlag ? (
          <div
            className="flex bg-gray-200 w-fit p-1 px-2 my-1 rounded-lg shadow-lg hover:bg-gray-300 cursor-pointer"
            onClick={() => {
              setDepartureDate("");
              setDateFocus(false);
              setFocusFlag(true);
            }}
          >
            {code}
            {num}
          </div>
        ) : (
          <div className="flex bg-gray-100 w-full rounded-lg">
            <input
              className={`${nanum_Gothic_Coding.className} bg-gray-100 p-1 pl-2 my-1 ml-2 w-full font-bold rounded-lg outline-gray-400 focus:ring-0`}
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
              placeholder={`${t("flightNum")} (OZ0123)`}
              ref={flightNumRef}
            ></input>
            {query ? (
              <button
                onClick={() => {
                  setQuery("");
                  flightNumRef.current.focus();
                }}
                className="clear-button p-2 w-fit"
              >
                <CloseIcon />
              </button>
            ) : (
              <div className="px-3"> </div>
            )}
          </div>
        )}
        {departureDate === "" ? (
          <input
            className={`text-base  rounded-lg px-2 py-1 m-1 appearance-none  outline-gray-400 focus:ring-0 ${
              focusFlag ? "w-4 bg-gray-100" : "bg-gray-200 cursor-pointer"
            }`}
            placeholder={t("date")}
            value={departureDate}
            onKeyDown={handleDateEnterPress}
            ref={dateInputRef}
            onChange={(e) => {}}
          />
        ) : (
          <div
            className="flex items-center bg-gray-200 px-2 p-1 my-1 shadow-lg rounded-lg hover:bg-gray-300 cursor-pointer"
            onClick={() => {
              setDepartureDate("");
              setDateFocus(true);
            }}
          >
            {departureDate}
          </div>
        )}
      </div>
      {only_en_num_flag && <p className="px-4">{t("only_en_num_msg")}</p>}
      <div className="flex items-center"></div>
      {focusFlag && query.length !== 0 && (
        <div>
          {matchingValues.length > 0 ? (
            <ul className="max-h-40 overflow-y-auto border border-gray-300 p-2 rounded-lg shadow-lg">
              {matchingValues.map((item, index) => (
                <li
                  key={index}
                  className={`flex justify-between border-b-2 rounded-lg cursor-pointer hover:bg-gray-200 ${
                    index === 0 ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleClick(item.iata, num)}
                >
                  <div className="flex">
                    <div className="flex items-center p-2 mr-2">
                      {item.logo === "" ? (
                        <>
                          <AirplaneDepartIcon />
                        </>
                      ) : (
                        <div>
                          <Image
                            width={35}
                            height={35}
                            src={item.logo}
                            alt={`airplane-logo-${index}`}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex">
                        {item.name}
                        <strong className="pl-2">{num}</strong>
                      </div>

                      <div className="flex">
                        {item.iata
                          .split("")
                          .map((char, i) =>
                            char === query[i] ? (
                              <strong key={i}>{char}</strong>
                            ) : (
                              char
                            )
                          )}
                        <p className="px-2">{`·`}</p>
                        <p>{item.icao}</p>
                      </div>
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="p-2 flex items-center">
                      <EnterIcon />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="max-h-40 overflow-y-auto border border-gray-300 p-2 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="p-2 mt-2 font-bold">{t("noresult_1")}</div>
                <div className="pb-2 mb-2">{t("noresult_2")}</div>
              </div>
            </ul>
          )}
        </div>
      )}
      {!focusFlag && dateFocus && (
        <div>
          <ul className="max-h-60 overflow-y-auto border border-gray-300 p-2 rounded-lg shadow-lg">
            <li
              className={`flex items-center justify-between border-b-2 rounded-lg cursor-pointer hover:bg-gray-200 bg-gray-100
              }`}
              onClick={() => setDepartureDate(today)}
            >
              <div className="flex">
                <div className="p-2">
                  <CalendarOneIcon />
                </div>
                <div className="flex items-center p-2 mr-2">{t("today")}</div>
              </div>
              <div className="p-2 flex items-center">
                <EnterIcon />
              </div>
            </li>
            <li
              className={`flex items-center justify-between border-b-2 rounded-lg cursor-pointer hover:bg-gray-200
              }`}
              onClick={() => {
                setDepartureDate(tomorrow);
              }}
            >
              <div className="flex">
                <div className="p-2">
                  <CalendarOneIcon />
                </div>
                <div className="flex items-center p-2 mr-2">
                  {t("tomorrow")}
                </div>
              </div>
            </li>
            <li
              className={`flex items-center justify-between border-b-2 rounded-lg
              }`}
            >
              <div className=" flex">
                <div className="p-2 flex justify-center items-center">
                  <CalendarsIcon />
                </div>
                <div className="">
                  <div className="flex items-cente mx-2 mt-1">
                    Pick from Calendar
                  </div>
                  <div className="">
                    <input
                      className={`text-base rounded-lg px-2 mx-2 bg-gray-100 appearance-none cursor-pointer hover:bg-200`}
                      type="date"
                      placeholder="test"
                      value={today}
                      min={today}
                      onChange={(e) => {
                        if (code !== "" && num !== "") {
                          setDepartureDate(e.target.value);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchFlight;
