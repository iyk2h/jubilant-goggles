"use client";

export default function MyButton({ text, type, onClick }) {
  const btnType = ["positive", "negative", "loading"].includes(type)
    ? type
    : "default";

  return (
    <div>
      <button
        className={[
          "MyButton",
          `MyButton_${btnType}`,
          "text-base",
          "shadow-lg",
        ].join(" ")}
        onClick={onClick}
      >
        {text} {/* Add this line to display the text inside the button */}
      </button>
      <style jsx>{`
        .MyButton {
          cursor: pointer;
          border: none;
          border-radius: 15px;
          padding-top: 8px;
          padding-bottom: 8px;
          padding-left: 15px;
          padding-right: 15px;
          white-space: nowrap;
        }

        .MyButton_default {
          background-color: #f6f6f6;
          color: black;
        }

        .MyButton_default:hover {
          // background-color: #f8f0e5;
          // color: #102c57;
        }

        .MyButton_positive {
          background-color: #102c57;
          color: #f8f0e5;
        }

        .MyButton_positive:hover {
          background-color: #f8f0e5;
          color: #102c57;
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
