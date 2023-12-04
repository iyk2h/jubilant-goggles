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
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg h-60 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    낮잠 추천 정보 (출발 국가 시간 기준)
                  </Dialog.Title>
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

                  <div className="mt-4">
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 mr-4 mb-4 rounded-md border border-transparent bg-teal-800 px-4 py-2 text-sm font-medium text-white hover:bg-teal-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
