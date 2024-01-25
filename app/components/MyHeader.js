"use client";

import { useRouter, usePathname } from "next/navigation";
import { ChatIcon, CloseIcon, Menu3Icon } from "../utils/icon/Icon";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

import { Navigation } from "react-minimal-side-navigation";
import "./SideNavi.css";
import { useState } from "react";

export default function MyHeader({ headText, leftChild, rightChild }) {
  const t = useTranslations("Head");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  // 한영 변환 기능
  const toggleLocale = () => {
    const newLocale = locale === "ko" ? "en" : "ko";
    const newPathname = pathname.replace(locale, newLocale);
    router.replace(newPathname);
    router.refresh();
  };

  const changeLocale = (newLocale) => {
    const newPathname = pathname.replace(locale, newLocale);
    router.replace(newPathname);
    router.refresh();
  };

  return (
    <div className="myHeader flex justify-center py-2 text-2xl mb-4 font-bold">
      <header className="flex w-full items-center">
        <div className="head_btn_left relative flex overflow-hidden">
          <div
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } fixed inset-0 bg-black opacity-50 transition-opacity z-20`}
            onClick={handleSidebarClose}
          ></div>

          <div
            className="px-4 py-5 cursor-pointer"
            onClick={handleSidebarToggle}
          >
            <Menu3Icon />
          </div>

          <div
            className={`${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full w-0 "
            } fixed h-screen z-20 top-0 -ml-4 bg-custom-third overflow-y-auto ease-in-out transition-all duration-300`}
          >
            <div
              className="flex justify-between border-b-2 cursor-pointer"
              onClick={handleSidebarClose}
            >
              <div className="px-10 py-7">Menu</div>
              <div className="flex justify-center items-center px-4 pr-6">
                <CloseIcon />
              </div>
            </div>
            <Navigation
              activeItemId={pathname}
              onSelect={({ itemId }) => {
                switch (itemId) {
                  case "en":
                  case "ko":
                    changeLocale(itemId);
                    break;
                  case "feedback":
                    window.open(
                      "https://docs.google.com/forms/d/e/1FAIpQLScDXl1lx5x0NBHFuPxjsp7fQC4M_A8ha-Z8XJdzIP3XahA6GA/viewform?usp=sf_link",
                      "_blank"
                    );
                    break;
                  default:
                    break;
                }

                if (!itemId.startsWith("item")) {
                  handleSidebarClose();
                }
              }}
              items={[
                {
                  title: t("language"),
                  itemId: "item_1",
                  subNav: [
                    {
                      title: "English",
                      itemId: "en",
                    },
                    {
                      title: "한국어",
                      itemId: "ko",
                    },
                  ],
                },
                {
                  title: "Contact",
                  itemId: "item_2",
                  subNav: [
                    {
                      title: t("feedback"),
                      itemId: "feedback",
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>

        <div
          className="head_text py-5 cursor-pointer"
          onClick={() => router.push(`/${locale}`)}
        >
          {headText}
        </div>

        <div
          className="head_btn_right cursor-pointer"
          onClick={() => {
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLScDXl1lx5x0NBHFuPxjsp7fQC4M_A8ha-Z8XJdzIP3XahA6GA/viewform?usp=sf_link",
              "_blank"
            );
          }}
        >
          <div className="px-4 py-5">
            <ChatIcon />
          </div>
        </div>
      </header>

      <style jsx>{`
        .myHeader {
          border-bottom: 1px solid #e2e2e2;
        }

        .head_text {
          width: 70%;
          text-align: center;
        }

        .head_btn_left {
          width: 15%;
          justify-content: start;
        }

        .head_btn_right {
          width: 15%;
          justify-content: end;
        }
      `}</style>
    </div>
  );
}
