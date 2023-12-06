"use client";

import FlightInfo from "./components/FlightInfo";
import MyHeader from "./components/MyHeader";

export default function Home() {
  return (
    <div className="container">
      <MyHeader headText="비행기 낮잠 가이드" />
      <FlightInfo />

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding-left: 20px;
          padding-right: 20px;
          background-color: white;

          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }

        @media (min-width: 420px) {
          .container {
            width: 410px;
            min-width: 410px;
          }
        }

        @media (max-width: 400px) {
          .container {
            width: 95vw;
          }
        }
      `}</style>
    </div>
  );
}
