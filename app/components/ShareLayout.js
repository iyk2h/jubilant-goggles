import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import KakaoShareButton from "./KakaoShareButton";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
  RedditShareButton,
  RedditIcon,
  PinterestShareButton,
  PinterestIcon,
} from "next-share";

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
                  <div className="flex gap-1 mt-2 text-center text-xs text-gray-500 overflow-x-auto">
                    <div className=" mx-1">
                      <KakaoShareButton url={url} />
                      <div>Kakao</div>
                    </div>

                    <LineShareButton url={url}>
                      <LineIcon size={50} round className="mx-1" />
                      <div>Line</div>
                    </LineShareButton>

                    <FacebookShareButton url={url} hashtag={"#LagLess"}>
                      <FacebookIcon size={50} round className="mx-1" />
                      <div>Facebook</div>
                    </FacebookShareButton>

                    <TwitterShareButton url={url}>
                      <TwitterIcon size={50} round className="mx-1" />
                      <div>Twitter</div>
                    </TwitterShareButton>

                    <RedditShareButton url={url}>
                      <RedditIcon size={50} round className="mx-1" />
                      <div>Reddit</div>
                    </RedditShareButton>

                    <PinterestShareButton url={url}>
                      <PinterestIcon size={50} round className="mx-1" />
                      <div>Pinterest</div>
                    </PinterestShareButton>
                  </div>
                  <div className="flex gap-2 border-2 border-gray-300 p-2 my-2 rounded-lg">
                    <div className="flex justify-center items-center w-3/4">
                      <input className="w-full  p-1" value={url} readOnly />
                    </div>
                    <div
                      className="flex justify-center items-center w-1/4 bg-black text-white rounded-full p-2 px-5 cursor-pointer hover:bg-gray-500"
                      onClick={copyToClipboard}
                    >
                      {t("copy")}
                    </div>
                  </div>
                  <div className="text-center">{isCopied && t("copyDone")}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
