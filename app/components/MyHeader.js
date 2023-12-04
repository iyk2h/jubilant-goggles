"use client";

export default function MyHeader({ headText, leftChild, rightChild }) {
  return (
    <div className="container flex justify-center my-5 py-5">
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
          width: 50%;
          color: #004d40;
          font-size: 23px;
          text-align: center;
        }

        .head_btn_left,
        .head_btn_right {
          width: 25%;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
