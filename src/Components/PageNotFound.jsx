import React from "react";
import loginBg from "./../assets/Images/team.jpg";

const PageNotFound = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="relative z-0">
        <img
          src={loginBg}
          alt=""
          className="w-full h-screen object-cover opacity-55"
        />
      </div>
      <div className="w-full  absolute top-0 left-0 min-h-screen flex justify-center items-center">
        <div className="bg-white p-5 max-w-[420px] rounded-xl w-full min-h-96 shadow-lg">
          Page not found
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
