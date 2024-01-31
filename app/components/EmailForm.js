import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import MyButton from "./MyButton";

export default function EmailForm({
  state = false,
  close,
  addEmail,
  retryEmail,
}) {
  const t = useTranslations("Email_Form");
  let [isOpen, setIsOpen] = useState(state);
  const [email, setEmail] = useState("");
  const [validFlag, setValidFlag] = useState(false);
  const emailRef = useRef();

  function closeModal() {
    try {
      close();
    } catch {}
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function validEmail(input) {
    setValidFlag(true);
    let regex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
    if (regex.test(input)) {
      addEmail(input);
      alert(t("added_email"));
    } else {
      alert(t("confirm_email"));
      emailRef.current.focus();
      setValidFlag(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!validFlag) validEmail(email);
    }
  };

  const retryEmailValid = () => {
    if (window.confirm(t("confirm_msg"))) {
      retryEmail(email);
      setEmail("");
      setValidFlag(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      emailRef.current.focus();
    }, 100);
  }, []);

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
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-custom-third p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Email
                  </Dialog.Title>
                  {t("explanation")}
                  <div
                    className={`flex gap-2 border-2 border-custom-text-color p-2 my-2 rounded-lg ${
                      validFlag ? "bg-gray-200" : ""
                    }`}
                  >
                    <input
                      className={`w-full  p-1 mx-1 bg-transparent`}
                      placeholder={"lagless@gmail.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      ref={emailRef}
                      readOnly={validFlag}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  {validFlag ? (
                    <div className="flex justify-end">
                      <MyButton
                        text={t("retry")}
                        onClick={() => {
                          retryEmailValid();
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <MyButton
                        text={t("apply")}
                        onClick={() => {
                          if (!validFlag) validEmail(email);
                        }}
                      />
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
