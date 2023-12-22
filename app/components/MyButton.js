"use client";

export default function MyButton({ text, type, onClick }) {
  const btnType = ["positive", "negative", "loading"].includes(type)
    ? type
    : "default";

  return (
    <div>
      <button
        className={["MyButton", `MyButton_${btnType}`, "text-xl"].join(" ")}
        onClick={onClick}
      >
        {text} {/* Add this line to display the text inside the button */}
      </button>
      <style jsx>{`
        .MyButton {
          cursor: pointer;
          border: none;
          border-radius: 5px;
          padding-top: 10px;
          padding-bottom: 10px;
          padding-left: 20px;
          padding-right: 20px;
          white-space: nowrap;
        }

        .MyButton_default {
          background-color: #f3f4f6;
          color: black;
        }

        .MyButton_default:hover {
          background-color: #d1d5db;
          color: black;
        }

        .MyButton_positive {
          background-color: #00695c;
          color: white;
        }

        .MyButton_positive:hover {
          background-color: #004d40;
          color: white;
        }

        .MyButton_negative {
          background-color: #fd565f;
          color: white;
        }

        .MyButton_loading {
          background-color: #67666674;
          color: white;
          cursor: default;
        }
      `}</style>
    </div>
  );
}
