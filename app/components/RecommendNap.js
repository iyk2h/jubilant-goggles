import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import MyButton from "./MyButton";

const RecommendNap = () => {
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <section>
        <div className="flex justify-end items-end pt-2 mt-3">
          <MyButton text={"Submit"} type={"positive"} onClick={openModal} />
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
                    className="text-lg m-3 font-medium leading-6 text-gray-900"
                  >
                    낮잠 추천
                  </Dialog.Title>
                  <>
                    <ul
                      aria-label="Activity feed"
                      role="feed"
                      className="relative flex flex-col gap-12 py-12 mr-12 left-[1rem] before:absolute before:top-0 before:left-[8.7rem] before:h-full before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-[8.7rem] after:bottom-6 after:border after:border-slate-200"
                    >
                      <li role="article" className="flex gap-2">
                        <div className="flex flex-col w-28 text-right">
                          <p className="text-sm text-slate-500">
                            7:35 AM, Dec 18
                          </p>
                          <h4 className="text-base font-medium text-slate-700">
                            ICN, Seoul
                          </h4>
                        </div>
                        <span className="flex items-center z-10 justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 ring-2 ring-white ">
                          <p className="text-3xl"> ✈︎ </p>
                        </span>
                        <div className="flex flex-col gap-0">
                          <p className="text-sm text-slate-500">
                            10:35 AM, Dec 18
                          </p>
                          <h4 className="text-base font-medium text-slate-700">
                            출발
                          </h4>
                        </div>
                      </li>
                      <li role="article" className="flex gap-2">
                        <div className="flex flex-col w-28 text-right">
                          <p className="text-sm text-slate-500">
                            8:35 AM, Dec 18
                          </p>
                        </div>
                        <span className="flex items-center z-10 justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 ring-2 ring-white ">
                          <p className="text-2xl mt-1"> ☾ </p>
                        </span>
                        <div className="flex flex-col gap-0">
                          <p className="text-sm text-slate-500">
                            11:35 PM, Dec 18
                          </p>
                          <h4 className="text-base font-medium text-slate-700">
                            낮잠!
                          </h4>
                        </div>
                      </li>
                      <li role="article" className="flex gap-2">
                        <div className="flex flex-col w-28 text-right">
                          <p className="text-sm text-slate-500">
                            10:10 AM, Dec 18
                          </p>
                        </div>
                        <span className="flex items-center z-10 justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 ring-2 ring-white ">
                          <p className="text-3xl mt-1"> ☀ </p>
                        </span>
                        <div className="flex flex-col gap-0">
                          <p className="text-sm text-slate-500">
                            1:10 PM, Dec 18
                          </p>
                          <h4 className="text-base font-medium text-slate-700">
                            기상!
                          </h4>
                        </div>
                      </li>
                      <li role="article" className="flex gap-2">
                        <div className="flex flex-col w-28 text-right">
                          <p className="text-sm text-slate-500">
                            10:20 AM, Dec 18
                          </p>
                        </div>
                        <span className="flex items-center z-10 justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 ring-2 ring-white ">
                          <p className="text-3xl"> ✈︎ </p>
                        </span>
                        <div className="flex flex-col gap-0">
                          <p className="text-sm text-slate-500">
                            1:20 PM, Dec 18
                          </p>
                          <h4 className="text-base font-medium text-slate-700">
                            Kuala Lumpur 도착!
                          </h4>
                        </div>
                      </li>
                    </ul>
                  </>
                  {/* <div className="mt-2">
                  <div className="flex justify-between">
                    <p className="text-5xl">{departureCountry.flag}</p>
                    <p className="text-4xl"> ✈︎ </p>
                    <p className="text-5xl"> {destinationCountry.flag}</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p>{naptimeInfo.departureDate}</p>
                    </div>
                    <div>
                      <p>{naptimeInfo.arrivaldestinationDate}</p>
                    </div>
                  </div>
                  <div className="flex items-centse">
                    <div className=" mr-1">
                      <p className="w-10 justify-start">
                        {naptimeInfo.departureTime}
                      </p>
                    </div>
                    <Progressbar
                      startT={naptimeInfo.napSleepTime}
                      endT={naptimeInfo.napWakeUpTime}
                      startR={naptimeInfo.napSleepRate}
                      endR={naptimeInfo.napWakeUpRate}
                    />
                    <div className="ml-1">
                      <p className="w-10 justify-start text-right">
                        {naptimeInfo.arrivaldestinationTime}
                      </p>
                    </div>
                  </div>
                </div> */}

                  <div className="m-4 p-1">
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 mr-4 my-4 rounded-md border border-transparent bg-teal-800 px-4 py-2 text-sm font-medium text-white hover:bg-teal-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it!
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
