import React from "react";
import loginBg from "./../assets/Images/team.jpg";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { useState } from "react";

const Home = () => {
  const [isTab, setIstab] = useState("login");

  const handleTabChanger = (tab) => {
    setIstab(tab);
  };

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
          {isTab === "login" && <Login handleTabChanger={handleTabChanger} />}
          {isTab === "regsiter" && (
            <Register handleTabChanger={handleTabChanger} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
