"use client";

import { useRouter, usePathname } from "next/navigation";
import { BackIcon, ChatIcon } from "../utils/icon/Icon";
import { useLocale } from "next-intl";

export default function MyHeader({ headText, leftChild, rightChild }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  return (
    <div className="myHeader flex justify-center py-2 text-2xl mb-4 font-bold">
      <header className="flex w-full items-center">
        <div
          className="head_btn_left py-5 cursor-pointer"
          onClick={router.back}
        >
          {pathname === `/${locale}` ? (
            <></>
          ) : (
            <div className="flex justify-center">
              <BackIcon />
            </div>
          )}
        </div>
        <div
          className="head_text py-5 cursor-pointer"
          onClick={() => router.push(`/${locale}`)}
        >
          {headText}
        </div>
        <div
          className="head_btn_right py-5 cursor-pointer"
          onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLScDXl1lx5x0NBHFuPxjsp7fQC4M_A8ha-Z8XJdzIP3XahA6GA/viewform?usp=sf_link",
              "_blank"
            )
          }
        >
          <div className="flex justify-center">
            <ChatIcon />
          </div>
        </div>
      </header>

      <style jsx>{`
        .myHeader {
          border-bottom: 1px solid #e2e2e2;
        }

        .head_text {
          width: 80%;
          text-align: center;
        }

        .head_btn_left {
          width: 10%;
          justify-content: start;
        }

        .head_btn_right {
          width: 10%;
          justify-content: end;
        }
      `}</style>
    </div>
  );
}
