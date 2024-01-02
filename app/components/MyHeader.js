"use client";

import { useRouter, usePathname } from "next/navigation";
import { BackIcon, ChatIcon } from "../utils/icon/Icon";

export default function MyHeader({ headText, leftChild, rightChild }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="myHeader flex justify-center py-5 my-5 text-3xl font-bold">
      <header
        className="flex w-full items-center cursor-pointer"
        onClick={router.back}
      >
        <div className="head_btn_left">
          {pathname === "/" ? (
            <></>
          ) : (
            <div className="flex justify-center">
              <BackIcon />
            </div>
          )}
        </div>
        <div className="head_text">{headText}</div>
        <div
          className="head_btn_right"
          onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLScDXl1lx5x0NBHFuPxjsp7fQC4M_A8ha-Z8XJdzIP3XahA6GA/viewform?usp=sf_link",
              "_blank"
            )
          }
        >
          <div className="flex justify-center cursor-pointer">
            <ChatIcon />
          </div>
        </div>
      </header>

      <style jsx>{`
        .myHeader {
          border-bottom: 1px solid #e2e2e2;
        }

        .head_text {
          width: 60%;
          color: #004d40;
          text-align: center;
        }

        .head_btn_left {
          width: 20%;
          justify-content: start;
        }

        .head_btn_right {
          width: 20%;
          justify-content: end;
        }
      `}</style>
    </div>
  );
}
