import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [error, setError] = useState({});

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserReg((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newError = {};

    if (!userReg.fullName.trim()) {
      newError.fullName = "Full name is required.";
    }

    if (!userReg.email.trim()) {
      newError.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userReg.email)) {
      newError.email = "Invalid email format.";
    }

    if (!userReg.phone.trim()) {
      newError.phone = "Phone number is required.";
    } else if (!/^\d{10,15}$/.test(userReg.phone)) {
      newError.phone = "Phone number must be 10–15 digits.";
    }

    if (!userReg.password.trim()) {
      newError.password = "Password is required.";
    } else if (userReg.password.length < 6) {
      newError.password = "Password must be at least 6 characters.";
    }

    if (!userReg.confirmPassword.trim()) {
      newError.confirmPassword = "Confirm password is required.";
    } else if (userReg.password !== userReg.confirmPassword) {
      newError.confirmPassword = "Passwords do not match.";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

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
        toast("User Register seuccessfully!");
        setTimeout(() => {
          handleTabChanger("login");
        }, 3000);
      }
    } catch (error) {
      console.log("error", error);
    }
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
            {error.fullName && (
              <small className="text-xs text-red-500">{error.fullName}</small>
            )}
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
            {error.email && (
              <small className="text-xs text-red-500">{error.email}</small>
            )}
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
            {error.phone && (
              <small className="text-xs text-red-500">{error.phone}</small>
            )}
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
            {error.password && (
              <small className="text-xs text-red-500">{error.password}</small>
            )}
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
            {error.confirmPassword && (
              <small className="text-xs text-red-500">
                {error.confirmPassword}
              </small>
            )}
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
