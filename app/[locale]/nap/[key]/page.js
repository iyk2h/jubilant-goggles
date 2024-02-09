"use client";

import RecommendNap from "../../../components/RecommendNap";
import { useRouter } from "next/navigation";
import bodytoimage from "dom-to-image";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import {
  DownloadIcon,
  HomeIcon,
  LoadingIcon,
  MailIcon,
  ShareIcon,
} from "@/app/utils/icon/Icon";
import { useLocale, useTranslations } from "next-intl";
import { useAirportInfosValue } from "../../AirportProvider";
import { useAirportInfosActions } from "../../AirportProvider";
import ShareLayout from "@/app/components/ShareLayout";
import MyButton from "@/app/components/MyButton";
import { save, deleteBy } from "@/app/api/mongoDB/repository";
import {
  formatDate,
  formatDateForUTC_0,
  formatDateString,
} from "@/app/utils/DateUtils";
import EmailForm from "@/app/components/EmailForm";

export default function Nap(param) {
  const t = useTranslations("Result");
  const router = useRouter();
  const locale = useLocale();

  const [airport, setArport] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [title, setTitle] = useState();
  const [isContain, setIsContain] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { setAirportInfo } = useAirportInfosActions();

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

  const addEmail = async (email) => {
    const value = {
      code: key,
      state: "todo",
      email: email,
      departureDate: formatDateForUTC_0(airport[0].departureInfo),
      departureDate_local_format: formatDateString(
        formatDate(airport[0].departureInfo),
        locale
      ),
      locale: locale,
      destination: airport[airport.length - 1].arrivalInfo.city,
    };
    await save({ input: value });
  };

  const retryEmail = async (email) => {
    const value = {
      code: key,
      state: "todo",
      email: email,
      departureDate: formatDateForUTC_0(airport[0].departureInfo),
      departureDate_local_format: formatDateString(
        formatDate(airport[0].departureInfo),
        locale
      ),
      locale: locale,
      destination: airport[airport.length - 1].arrivalInfo.city,
    };
    await deleteBy({ input: value });
  };

  const addMyTravel = () => {
    const storedAirports = localStorage.getItem("sleep_tips");
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

    localStorage.setItem("sleep_tips", JSON.stringify(sortedHistory));

    setIsAdded(true);
    setIsContain(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const divRef = useRef(null);
  const handleDownload = async () => {
    if (!divRef.current) {
      console.log("divRef.current 없음");
      return;
    }
    console.log("divRef.current 있음");
    console.log(divRef.current);
    html2canvas(divRef.current, {
      allowTaint: true,
      useCORS: true,
    }).then(function (canvas) {
      console.log("canvas: " + canvas);
      canvas.toBlob((blob) => {
        saveAs(blob, "test.jpg");
      });
      document.getElementById("recomend-nap").appendChild(canvas);
    });
  };

  https: useEffect(() => {
    const storedAirports = localStorage.getItem("sleep_tips");
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

  let [isEmailFormOpen, setIsEmailFormOpen] = useState(false);

  const openEmailForm = () => {
    setIsEmailFormOpen(true);
  };

  const closeEmailForm = () => {
    setIsEmailFormOpen(false);
  };

  const airportInfos = useAirportInfosValue();

  useEffect(() => {
    if (airportInfos && airportInfos.length === 0) {
      if (airport.length === 0) {
        getAirportInfo();
      }
    } else {
      setArport(airportInfos.airport);
      setTitle(airportInfos.title);
      setAirportInfo([]);
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
                </div>
              </>
            ) : (
              <div className=" mb-20">
                <div
                  id="recomend-nap"
                  ref={divRef}
                  className=" bg-custom-third"
                >
                  <RecommendNap title={title} airportInfos={airport} />
                </div>
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
                <div className="flex w-full justify-center items-center my-2 mb-4 gap-2">
                  {/* <MyButton
                    text={
                      <div className="flex justify-center items-center gap-1 p-1">
                        <HomeIcon />
                      </div>
                    }
                    onClick={() => {
                      router.push("/");
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  /> */}
                  <MyButton
                    id="nap_result_share_button"
                    text={
                      <div
                        id="nap_result_share_button_div"
                        className="flex justify-center items-center gap-1 p-1"
                      >
                        <ShareIcon id="nap_result_share_icon" />
                      </div>
                    }
                    onClick={openModal}
                  />
                  {isModalOpen && (
                    <ShareLayout value={key} state={true} close={closeModal} />
                  )}
                  <MyButton
                    id="nap_result_reminders"
                    text={
                      <div
                        id="nap_result_remindersbutton_div"
                        className="flex justify-center items-center gap-1"
                      >
                        <MailIcon id="nap_result_reminders_icon" />
                      </div>
                    }
                    onClick={openEmailForm}
                  />
                  {isEmailFormOpen && (
                    <EmailForm
                      value={key}
                      state={true}
                      close={closeEmailForm}
                      addEmail={addEmail}
                      retryEmail={retryEmail}
                    />
                  )}
                  <div id="nap_result_download_img">
                    <MyButton
                      id={"nap_result_download"}
                      text={
                        <div id="nap_result_download_div">
                          <DownloadIcon id={"nap_result_download_icon"} />
                        </div>
                      }
                      onClick={handleDownload}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
