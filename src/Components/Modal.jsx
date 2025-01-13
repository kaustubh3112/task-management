import React from "react";
import { FiXCircle } from "react-icons/fi";

const Modal = ({ title, content, modalCloseHandler }) => {
  return (
    <div className="w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center">
      <div
        className="w-full h-full absolute top-0 left-0 z-10 bg-black/70 backdrop-blur-sm"
        onClick={modalCloseHandler}
      ></div>

      <div className="w-full max-w-screen-sm p-7 rounded-xl bg-white relative z-20">
        <div className="pb-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">{title}</h1>
          <button
            onClick={modalCloseHandler}
            className="text-red-500 text-xl font-bold"
          >
            <FiXCircle className="w-5 h-5" />
          </button>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
