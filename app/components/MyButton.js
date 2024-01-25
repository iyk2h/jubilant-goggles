"use client";

export default function MyButton({ id, text, type, onClick }) {
  const btnType = ["positive", "negative", "loading"].includes(type)
    ? type
    : "default";

  return (
    <div>
      <button
        id={id}
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
          // border: 1px solid #eadbc8;
          background-color: #eadbc8;
          // color: black;
        }

        .MyButton_default:hover {
          background-color: #f8f0e5;
          // color: #102c57;
        }

        .MyButton_positive {
          background-color: #102c57;
          color: #f8f0e5;
        }

        .MyButton_positive:hover {
          background-color: #eadbc8;
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
