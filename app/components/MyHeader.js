"use client";

export default function MyHeader({ headText, leftChild, rightChild }) {
  return (
    <div className="container flex justify-center my-5 py-5 text-3xl">
      <header className="flex w-full items-center">
        <div className="head_btn_left">{leftChild}</div>
        <div className="head_text">{headText}</div>
        <div className="head_btn_right">{rightChild}</div>
      </header>

      <style jsx>{`
        .container {
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
