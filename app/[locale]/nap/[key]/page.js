"use client";

import RecommendNap from "../../../components/RecommendNap";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import axios from "axios";
import { CloseIcon, LoadingIcon, ShareIcon } from "@/app/utils/icon/Icon";
import { useTranslations } from "next-intl";
import { useAirportInfosValue } from "../../AirportProvider";
import ShareLayout from "@/app/components/ShareLayout";
import MyButton from "@/app/components/MyButton";

export default function Nap(param) {
  const t = useTranslations("Result");
  const router = useRouter();

  const [airport, setArport] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [title, setTitle] = useState();
  const [isContain, setIsContain] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const key = param.params.key;

  const getAirportInfo = async () => {
    try {
      const apiUrl = `/api/nap/${key}`;
      const { data } = await axios.get(apiUrl);
      setTitle(data.title);
      setArport(data.airport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadings(false);
    }
  };

  const addMyTravel = () => {
    const storedAirports = localStorage.getItem("nap_tips");
    let parsedAirports = [];
    if (storedAirports !== null) {
      parsedAirports = JSON.parse(storedAirports);
    }

    const newHistory = [...parsedAirports, { key, title }];

    const sortedHistory = newHistory.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });

    localStorage.setItem("nap_tips", JSON.stringify(sortedHistory));

    setIsAdded(true);
    setIsContain(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  useEffect(() => {
    const storedAirports = localStorage.getItem("nap_tips");
    if (storedAirports) {
      const parsedAirports = JSON.parse(storedAirports);
      const isKeyExist = parsedAirports.some((airport) => airport.key === key);
      setIsContain(isKeyExist);
    }
  }, []);

  let [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const airportInfos = useAirportInfosValue();

  useEffect(() => {
    if (airportInfos && airportInfos.length === 0) {
      getAirportInfo();
    } else {
      setArport(airportInfos.airport);
      setTitle(airportInfos.title);
      setLoadings(false);
    }
  }, [airportInfos]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">{t("title")}</div>
        <div className="flex gap-1">
          <div
            className="flex p-2 bg-gray-200 cursor-pointer rounded-full hover:bg-gray-300"
            onClick={openModal}
            text={t("share")}
          >
            <ShareIcon />
            {isModalOpen && (
              <ShareLayout value={key} state={true} close={closeModal} />
            )}
          </div>
          <div
            className="flex p-2 bg-gray-200 cursor-pointer rounded-full hover:bg-gray-300"
            onClick={() => router.push("/")}
          >
            <CloseIcon />
          </div>
        </div>
      </div>
      <section className="">
        {loadings ? (
          <div className="flex justify-center items-center py-5">
            <div className="mr-3 mb-1">
              <LoadingIcon />
            </div>
          </div>
        ) : (
          <>
            {airport.length === 0 ? (
              <>
                <div>
                  <div className="py-8 mt-7 text-center text-base bg-gray-100 rounded-xl">
                    <p>{t("not_result_msg_1")}</p>
                    <p>{t("not_result_msg_2")}</p>
                  </div>
                  <div
                    className="flex justify-center w-full bg-black text-white shadow-lg rounded-xl p-2 my-3 cursor-pointer hover:bg-gray-200 hover:text-black"
                    onClick={() => router.push("/")}
                  >
                    {t("go_home")}
                  </div>
                </div>
              </>
            ) : (
              <div className=" mb-20">
                <RecommendNap title={title} airportInfos={airport} />
                <div className="flex w-full justify-center items-center my-2 mb-4">
                  {isContain ? (
                    <div className="flex justify-center items-center pl-3">
                      {isAdded && t("added_my_travels")}
                    </div>
                  ) : (
                    <div className="flex">
                      <MyButton
                        text={t("add_my_travels")}
                        onClick={addMyTravel}
                      />
                    </div>
                  )}
                </div>
                <div
                  className="flex justify-center w-full bg-black text-white shadow-lg rounded-xl p-2 cursor-pointer hover:bg-gray-200 hover:text-black"
                  onClick={() => router.push("/")}
                >
                  {t("go_home")}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
