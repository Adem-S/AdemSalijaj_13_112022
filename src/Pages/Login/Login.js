import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  changeEmail,
  changePassword,
  toggleRememberMe,
} from "../../Features/Auth/auth";

import { fetchUserByCredentials } from "../../Service/service";

/**
 * Component for showing Login page
 *
 * @component
 */
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password, errorMessage, rememberMe } = useSelector(
    (state) => state.authSlice
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/profile");
    }
  }, []);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => dispatch(changeEmail(e.target.value))}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => dispatch(changePassword(e.target.value))}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              value={rememberMe}
              onChange={() => dispatch(toggleRememberMe())}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            className="sign-in-button"
            onClick={(e) => {
              e.preventDefault();
              dispatch(fetchUserByCredentials({ email, password }));
            }}
          >
            Sign In
          </button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </section>
    </main>
  );
};

export default Login;
