"use client";

import RecommendNap from "../../../components/RecommendNap";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  CloseIcon,
  HomeIcon,
  LoadingIcon,
  ShareIcon,
} from "@/app/utils/icon/Icon";
import { useTranslations } from "next-intl";
import { useAirportInfosValue } from "../../AirportProvider";
import ShareLayout from "@/app/components/ShareLayout";
import MyButton from "@/app/components/MyButton";
import {
  findAllByDate,
  save,
} from "@/app/api/mailing/repository/mailingRepository";
import { formatDateForUTC_0 } from "@/app/utils/DateUtils";

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

  const addEmail = async () => {
    const value = {
      code: key,
      state: "todo",
      email: "test@gmail.com",
      departureDate: formatDateForUTC_0(airport[0].departureInfo),
    };
    await save({ input: value });
  };

  const addEmail2 = async () => {
    await findAllByDate({ date: formatDateForUTC_0(airport[0].departureInfo) });
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
            className="flex p-1 mx-1 border-2 border-left-bg cursor-pointer rounded-full hover:bg-left-bg"
            onClick={() => router.push("/")}
          >
            <HomeIcon />
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
                  <div className="py-8 mt-7 text-center text-base bg-right-bg rounded-xl">
                    <p>{t("not_result_msg_1")}</p>
                    <p>{t("not_result_msg_2")}</p>
                  </div>
                  {/* <div
                    className="flex justify-center w-full bg-black text-white shadow-lg rounded-xl p-2 my-3 cursor-pointer hover:bg-gray-200 hover:text-black"
                    onClick={() => router.push("/")}
                  >
                    {t("go_home")}
                  </div> */}
                </div>
              </>
            ) : (
              <div className=" mb-20">
                <RecommendNap title={title} airportInfos={airport} />
                <div className="flex w-full justify-center items-center my-2 mb-4 gap-2">
                  {isContain ? (
                    <div className="flex justify-center items-center pl-3">
                      {isAdded && t("added_my_travels")}
                    </div>
                  ) : (
                    <div className="flex">
                      <MyButton
                        text={t("add_my_travels")}
                        type={"positive"}
                        onClick={addMyTravel}
                      />
                    </div>
                  )}
                </div>
                <div className="flex w-full justify-between items-center my-2 mb-4 gap-2">
                  <MyButton
                    text={
                      <div className="flex justify-center items-center gap-1">
                        <HomeIcon /> {t("go_home")}
                      </div>
                    }
                    onClick={() => {
                      router.push("/");
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  />
                  <MyButton
                    id="nap_result_share_button"
                    text={
                      <div
                        id="nap_result_share_button_div"
                        className="flex justify-center items-center gap-1"
                      >
                        <ShareIcon id="nap_result_share_icon" />
                        {t("share")}
                      </div>
                    }
                    onClick={openModal}
                  />
                  {isModalOpen && (
                    <ShareLayout value={key} state={true} close={closeModal} />
                  )}
                </div>
              </div>
            )}
          </>
        )}
        <div
          onClick={() => {
            addEmail();
          }}
        >
          test
        </div>
        <div
          onClick={() => {
            addEmail2();
          }}
        >
          test2
        </div>
      </section>
    </>
  );
}
