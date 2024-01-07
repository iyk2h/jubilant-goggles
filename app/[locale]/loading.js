"use client";

import { LoadingIcon } from "../utils/icon/Icon";

export default function Loading() {
  return (
    <div>
      <div className="overlay" />
      <div className="loading-container">
        <LoadingIcon />
      </div>
      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
          display: block;
        }

        .loading-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff; /* Adjust background color as needed */
          color: #000; /* Adjust text color as needed */
          padding: 20px;
          border-radius: 8px;
          font-size: 1.2em;
          z-index: 1000;
          visibility: visible;
          opacity: 1;
          transition: visibility 0s, opacity 0.5s linear;
        }
      `}</style>
    </div>
  );
}
