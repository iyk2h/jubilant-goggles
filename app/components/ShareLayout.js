import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function ShareLayout({ value, state = false, close }) {
  const t = useTranslations("Share");
  let [isOpen, setIsOpen] = useState(state);
  const [isCopied, setIsCopied] = useState(false);

  function closeModal() {
    try {
      close();
    } catch {}
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [url, setUrl] = useState(``);

  useEffect(() => {
    const baseUrl = window.location.origin;
    setUrl(`${baseUrl}/nap/${value}`);
  }, [value]);

  const copyToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.value = url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <>
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

          <div className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {t("title")}
                  </Dialog.Title>
                  <div className="flex gap-2 mt-2">
                    <p className="text-sm text-gray-500">Kakao Talk</p>
                    <p className="text-sm text-gray-500">Facebook</p>
                    <p className="text-sm text-gray-500">Twitter</p>
                  </div>
                  <div className="flex gap-2 bg-gray-300 p-2 my-2 rounded-lg">
                    <p className="flex justify-center items-center w-3/4">
                      <input
                        className="w-full bg-gray-300 p-1"
                        value={url}
                        readOnly
                      />
                    </p>
                    <p
                      className="flex justify-center items-center w-1/4 bg-gray-500 text-white rounded-full p-2 px-5 cursor-pointer hover:bg-gray-400"
                      onClick={copyToClipboard}
                    >
                      {t("copy")}
                    </p>
                  </div>
                  {isCopied && t("copyDone")}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
