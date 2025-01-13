import React, { useState } from "react";
import { Link } from "react-router-dom";
import { config, postData } from "../../Api/Services";
import { toast, ToastContainer } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = ({ handleTabChanger }) => {
  const [userReg, setUserReg] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserReg((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        ...userReg,
        userDetails: [],
        regsiteredOn: new Date(),
      };

      let response = await postData(`${config.apiBaseUrl}/users`, payload);

      if (response) {
        setUserReg({
          fullName: "",
          email: "",
          designation: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        toast("User added seuccessfully!");
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="w-full">
        <h2 className="text-2xl mb-2 text-center font-bold text-slate-800">
          Create Your Account
        </h2>
        <p className="text-sm mb-5 text-slate-500 text-center max-w-[80%] mx-auto">
          Join us and unlock endless possibilities! .
        </p>
        <form onSubmit={formSubmit} noValidate>
          <div className="w-full mb-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-slate-200 px-4 py-2.5 rounded-md outline-none"
              onChange={inputHandler}
              value={userReg.fullName}
              name="fullName"
            />
          </div>
          <div className="w-full mb-4">
            <input
              type="text"
              placeholder="Email"
              className="w-full border border-slate-200 px-4 py-2.5 rounded-md outline-none"
              onChange={inputHandler}
              value={userReg.email}
              name="email"
            />
          </div>
          <div className="w-full mb-4">
            <input
              type="text"
              placeholder="Designation"
              className="w-full border border-slate-200 px-4 py-2.5 rounded-md outline-none"
              onChange={inputHandler}
              value={userReg.designation}
              name="designation"
            />
          </div>
          <div className="w-full mb-4">
            <input
              type="text"
              placeholder="Phone"
              className="w-full border border-slate-200 px-4 py-2.5 rounded-md outline-none"
              onChange={inputHandler}
              value={userReg.phone}
              name="phone"
            />
          </div>
          <div className="w-full mb-4 relative z-0">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-slate-200 px-4 py-2.5 rounded-md outline-none"
              onChange={inputHandler}
              value={userReg.password}
              name="password"
            />
            <button
              type="button"
              onClick={showPasswordHandler}
              className="absolute top-3 right-3 z-10"
            >
              {showPassword ? (
                <FiEye className="w-5 h-5 text-slate-500" />
              ) : (
                <FiEyeOff className="w-5 h-5 text-slate-500" />
              )}
            </button>
          </div>
          <div className="w-full mb-4 relative z-0">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full border border-slate-200 px-4 py-2.5 rounded-md outline-none"
              onChange={inputHandler}
              value={userReg.confirmPassword}
              name="confirmPassword"
            />
            <button
              type="button"
              onClick={showPasswordHandler}
              className="absolute top-3 right-3 z-10"
            >
              {showPassword ? (
                <FiEye className="w-5 h-5 text-slate-500" />
              ) : (
                <FiEyeOff className="w-5 h-5 text-slate-500" />
              )}
            </button>
          </div>
          <div className="w-full mb-4">
            <button
              type="submit"
              className="w-full bg-black hover:bg-black/80 px-4 py-2.5 rounded-md outline-none text-white text-md"
            >
              Register Now
            </button>
          </div>
        </form>
        <p className="text-sm mb-5 text-slate-500 text-center">
          Sign up in just a few steps to start your journey with us. Already
          have an account?
          <br />
          <button
            onClick={() => handleTabChanger("login")}
            className="font-semibold text-black inline-block mt-1"
          >
            Log in
          </button>{" "}
          here
        </p>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
