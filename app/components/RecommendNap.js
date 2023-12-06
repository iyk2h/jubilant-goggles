import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import MyButton from "./MyButton";

const { DateTime } = require("luxon");

const RecommendNap = () => {
  let [isOpen, setIsOpen] = useState(false);

  const [dateInfo, setDateInfo] = useState({
    departCity: "",
    departStartDate: "",
    departNapStart: "",
    departNapEnd: "",
    departEndDate: "",
    arrivalStartDate: "",
    arrvalNapStart: "",
    arrvalNapEnd: "",
    arrivalEndDate: "",
    arrivalCity: "",
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    const localInfo = localStorage.getItem("airportInfo");
    if (!localInfo) {
      alert("비행 정보를 로딩 중입니다. 다시 시도해 주세요.");
      return;
    }

    const airportInfo = JSON.parse(localInfo);

    const departureInfo = airportInfo.departureInfo;
    const arrivalInfo = airportInfo.arrivalInfo;

    const departDateForm = formatDate(departureInfo);

    const arrivalDateForm = formatDate(arrivalInfo);
    const flightTime = getDiffTime(arrivalDateForm.diff(departDateForm));
    const departEndDateForm = departDateForm.plus(flightTime);
    const arrivalStartDateForm = arrivalDateForm.minus(flightTime);

    setDateInfo({
      departCity: departureInfo.city,
      departStartDate: formatDateString(departDateForm),
      departNapStart: formatDateString(departDateForm.plus({ hour: 1 })),
      departNapEnd: formatDateString(departEndDateForm.minus({ hour: 1 })),
      departEndDate: formatDateString(departEndDateForm),
      arrivalStartDate: formatDateString(arrivalStartDateForm),
      arrvalNapStart: formatDateString(arrivalStartDateForm.plus({ hour: 1 })),
      arrvalNapEnd: formatDateString(arrivalDateForm.minus({ hour: 1 })),
      arrivalEndDate: formatDateString(arrivalDateForm),
      arrivalCity: arrivalInfo.city,
    });

    setIsOpen(true);
  };

  const getDiffTime = (diff) => {
    return {
      hours: diff.toFormat("hh"),
      minutes: diff.toFormat("mm"),
    };
  };

  const formatDate = (info) => {
    return DateTime.fromFormat(info.datetime, "MM/d/yyyy, h:mm:ss a").setZone(
      info.timezone,
      {
        keepLocalTime: true,
      }
    );
  };

  const formatDateString = (dateTime) => {
    return dateTime.toFormat("hh:mm a, LLL dd");
  };

  return (
    <>
      <section>
        <div className="flex justify-end items-end pt-2 mt-3">
          <MyButton text={"확인"} type={"positive"} onClick={openModal} />
        </div>
      </section>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="max-w-xl min-w-xl w-xl rounded-lg bg-white p-5">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl m-3 font-medium leading-6 text-gray-900"
                  >
                    낮잠 추천
                  </Dialog.Title>
                  <>
                    <ul
                      aria-label="Activity feed"
                      role="feed"
                      className="relative flex flex-col gap-12 py-12 left-[0rem] before:absolute before:top-0 before:left-[8.7rem] before:h-full before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-[8.7rem] after:bottom-6 after:border after:border-slate-200"
                    >
                      <li role="article" className="flex gap-2">
                        <div className="flex flex-col w-28 text-right">
                          <p className="text-base text-slate-500">
                            {dateInfo.departStartDate}
                          </p>
                          <h4 className="text-xl font-medium text-slate-700">
                            {dateInfo.departCity}
                          </h4>
                        </div>
                        <span className="flex items-center z-10 justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 ring-2 ring-white ">
                          <p className="text-3xl mb-1"> ✈︎ </p>
                        </span>
                        <div className="flex flex-col gap-0 w-28">
                          <p className="text-base text-slate-500">
                            {dateInfo.arrivalStartDate}
                          </p>
                          <h4 className="text-xl font-medium text-slate-700">
                            출발
                          </h4>
                        </div>
                      </li>
                      <li role="article" className="flex gap-2">
                        <div className="flex flex-col w-28 text-right">
                          <p className="text-base text-slate-500">
                            {dateInfo.departNapStart}
                          </p>
                        </div>
                        <span className="flex items-center z-10 justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 ring-2 ring-white ">
                          <p className="text-3xl mt-1"> ☾ </p>
                        </span>
                        <div className="flex flex-col gap-0 w-28">
                          <p className="text-base text-slate-500">
                            {dateInfo.arrvalNapStart}
                          </p>
                          <h4 className="text-xl font-medium text-slate-700">
                            낮잠!
                          </h4>
                        </div>
                      </li>
                      <li role="article" className="flex gap-2">
                        <div className="flex flex-col w-28 text-right">
                          <p className="text-base text-slate-500">
                            {dateInfo.departNapEnd}
                          </p>
                        </div>
                        <span className="flex items-center z-10 justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 ring-2 ring-white ">
                          <p className="text-3xl mt-1"> ☀ </p>
                        </span>
                        <div className="flex flex-col gap-0 w-28">
                          <p className="text-base text-slate-500">
                            {dateInfo.arrvalNapEnd}
                          </p>
                          <h4 className="text-xl font-medium text-slate-700">
                            기상!
                          </h4>
                        </div>
                      </li>
                      <li role="article" className="flex gap-2">
                        <div className="flex flex-col w-28 text-right">
                          <p className="text-base text-slate-500">
                            {dateInfo.departEndDate}
                          </p>
                        </div>
                        <span className="flex items-center z-10 justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 ring-2 ring-white ">
                          <p className="text-3xl mb-1"> ✈︎ </p>
                        </span>
                        <div className="flex flex-col gap-0 w-28">
                          <p className="text-base text-slate-500">
                            {dateInfo.arrivalEndDate}
                          </p>
                          <h4 className="text-xl font-medium text-slate-700">
                            {dateInfo.arrivalCity}
                          </h4>
                          <h4 className="text-xl font-medium text-slate-700">
                            도착!
                          </h4>
                        </div>
                      </li>
                    </ul>
                  </>
                  <div className="m-4 p-1">
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 mr-4 my-4 rounded-md border border-transparent bg-teal-800 px-4 py-2 text-base font-medium text-white hover:bg-teal-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      확인
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default RecommendNap;
