import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config, getData } from "../../Api/Services";
import { toast, ToastContainer } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = ({ handleTabChanger }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const showPasswordHandler = () => setShowPassword((prev) => !prev);

  const validateForm = () => {
    const newError = {};

    if (!user.email.trim()) {
      newError.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newError.email = "Invalid email format.";
    }

    if (!user.password.trim()) {
      newError.password = "Password is required.";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await getData(`${config.apiBaseUrl}/users`);
      if (!result || result.length === 0) {
        toast.error("No users found in the database.");
        return;
      }

      const loggedInUser = result.find(
        (dbUser) =>
          dbUser.email?.toLowerCase() === user.email.toLowerCase() &&
          dbUser.password === user.password
      );

      if (loggedInUser) {
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        toast.success("Login Successful!");
        setTimeout(() => navigate("/overview"), 1000);
      } else {
        toast.error("Incorrect login details.");
      }
    } catch (error) {
      console.error("Login failed: ", error);
      toast.error("Failed to log in. Please try again later.");
    }
  };

  return (
    <>
      <div className="w-full">
        <h2 className="text-2xl mb-2 text-center font-bold text-slate-800">
          Login to dashboard
        </h2>
        <p className="text-sm mb-5 text-slate-500 text-center max-w-[80%] mx-auto">
          Access your account to stay connected and manage your projects
          effortlessly.
        </p>
        <form onSubmit={formSubmit} noValidate>
          <div className="w-full mb-4">
            <input
              type="text"
              placeholder="Email"
              className="w-full border border-slate-200 px-4 py-2.5 rounded-md outline-none"
              onChange={inputHandler}
              value={user.email}
              name="email"
            />
            {error.email && (
              <small className="text-xs text-red-500">{error.email}</small>
            )}
          </div>
          <div className="w-full mb-4 relative z-0">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-slate-200 px-4 py-2.5 rounded-md outline-none"
              onChange={inputHandler}
              value={user.password}
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
          <div className="w-full mb-4">
            <button
              type="submit"
              className="w-full bg-black hover:bg-black/80 px-4 py-2.5 rounded-md outline-none text-white text-md"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-sm mb-5 text-slate-500 text-center max-w-[80%] mx-auto">
          Don't have an account?
          <br />
          <button
            onClick={() => handleTabChanger("regsiter")}
            className="font-semibold text-black"
          >
            Sign up
          </button>
          &nbsp; today and get started!
        </p>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
