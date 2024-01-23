"use client";

import { useEffect, useRef, useState } from "react";
import { MenuIcon, SearchIcon } from "../utils/icon/Icon";
import { useRouter } from "next/navigation";
import { useAirportInfosActions } from "./AirportProvider";
import { formatStrS, nowDate, formatDate } from "../utils/DateUtils";
import { useTranslations, useLocale } from "next-intl";
import ShareLayout from "../components/ShareLayout";

export default function Home() {
  const t = useTranslations("Home");
  const local = useLocale();
  const router = useRouter();
  const dropdownRef = useRef(null);

  const [airportInfos, setAirports] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  useEffect(() => {
    const storedAirports = localStorage.getItem("nap_tips");
    const afterToday = [];

    if (storedAirports) {
      const parsedAirports = JSON.parse(storedAirports);

      // parsedAirports.forEach((info, index) => {
      //   const lastDateTime = formatDate(
      //     info.airport[info.airport.length - 1].arrivalInfo
      //   );
      //   if (lastDateTime > nowDate()) {
      //     afterToday.push(info);
      //   }
      // });

      setAirports(parsedAirports);
    }
  }, []);

  const { setAirportInfo } = useAirportInfosActions();

  const clickHandle = (param) => {
    router.push(`/nap/${param}`);
  };

  const deleteAirportHistory = (key) => {
    const storedAirports = localStorage.getItem("nap_tips");

    if (storedAirports) {
      const parsedAirports = JSON.parse(storedAirports);
      const updatedAirports = parsedAirports.filter(
        (airportInfo) => airportInfo.key !== key
      );

      localStorage.setItem("nap_tips", JSON.stringify(updatedAirports));
      setAirports(updatedAirports);
    }
  };

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSelect = (key) => {
    setOpenDropdownIndex(null);
    deleteAirportHistory(key);
  };

  useEffect(() => {
    const closeDropdown = (event) => {
      setOpenDropdownIndex(null);
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, [dropdownRef, openDropdownIndex]);

  let [isModalOpen, setIsModalOpen] = useState(false);

  const [value, setValue] = useState();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="text-2xl font-bold">{t("mytravels")}</div>
      <div className="flex justify-between my-2 mb-6">
        <div
          id="add_flight"
          className="flex justify-center w-full bg-custom-third  shadow-lg rounded-xl p-2 cursor-pointer hover:bg-left-bg hover:text-black"
          onClick={() => router.push("/flights")}
        >
          <div
            id="add_flight_icons"
            className="flex justify-normal items-center"
          >
            <div id="add_flight_msg">{t("addTravel")}</div>
          </div>
        </div>
      </div>
      {airportInfos.length !== 0 ? (
        <div className="mb-20">
          {airportInfos.map((info, index) => (
            <div
              id={`view_detail_${index}`}
              key={index}
              className="relative inline-block text-left pb-2 w-full text-base cursor-pointer"
              ref={dropdownRef}
            >
              <div className="flex justify-between shadow-xl rounded-xl bg-right-bg hover:bg-left-bg">
                <div
                  className=" w-full p-4 rounded-l-xl"
                  onClick={() => clickHandle(info.key)}
                >
                  {info.title.split("_")[1]}
                  <br />
                  {formatStrS(info.title.split("_")[0], local)}
                </div>
                <div
                  className="p-2 pt-3 rounded-r-xl"
                  onClick={() => toggleDropdown(index)}
                >
                  <MenuIcon />
                  {openDropdownIndex !== null &&
                    openDropdownIndex === index && (
                      <div className="absolute origin-top-right z-10 right-2 mt-2 w-18 rounded-lg shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <div
                            onClick={() => {
                              openModal();
                              setValue(info.key);
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-b-2"
                            role="menuitem"
                          >
                            {t("share")}
                          </div>
                          <div
                            onClick={() => handleSelect(info.key)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-b-2"
                            role="menuitem"
                          >
                            <div className="flex gap-1">{t("delete")}</div>
                          </div>
                          <div
                            onClick={() => setOpenDropdownIndex(null)}
                            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
                            role="menuitem"
                          >
                            <div className="flex gap-1">{t("close")}</div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="py-8 y-2 text-center text-base bg-right-bg rounded-xl">
            <p>{t("guide_msg_1")}</p>
            <p>{t("guide_msg_2")}</p>
          </div>
        </>
      )}
      {isModalOpen && (
        <ShareLayout value={value} state={true} close={closeModal} />
      )}
    </div>
  );
}
