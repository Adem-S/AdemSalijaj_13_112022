import React from "react";

/* import "./App.css"; */

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "../Pages/Header/Header";
import Footer from "../Pages/Footer/Footer";
import Profile from "../Pages/Profile/Profile";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { loginWithToken } from "../Features/Auth/auth";
import { fetchUserData, resetUser } from "../Features/User/user";

/**
 * Component for showing App with Routes
 *
 * @component
 */
function App() {
  const { rememberMe, token } = useSelector((state) => state.authSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      dispatch(loginWithToken(localToken));
    }
  }, []);

  useEffect(() => {
    if (token) {
      if (rememberMe) {
        localStorage.setItem("token", token);
      }
      dispatch(fetchUserData(token));
      navigate("/profile");
    } else {
      localStorage.removeItem("token", token);
      dispatch(resetUser());
    }
  }, [token]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
