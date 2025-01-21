import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const Authentication = () => {
    const userLogins = JSON.parse(localStorage.getItem("user"));
    if (userLogins) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      navigate("/");
    }
  };

  useEffect(() => {
    Authentication();
  }, [navigate]);

  return isLogin ? element : <Navigate to="/overview" />;
};

export default PrivateRoute;
