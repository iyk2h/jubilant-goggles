"use client";

import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

export default function Home() {
  return (
    <div className="container">
      <MyHeader headText="비행기 낮잠 가이드" />

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding-left: 20px;
          padding-right: 20px;
          background-color: white;

          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }

        @media (min-width: 400px) {
          .container {
            width: 390px;
            min-width: 390px;
          }
        }

        @media (max-width: 400px) {
          .container {
            width: 90vw;
          }
        }
      `}</style>
    </div>
  );
}
