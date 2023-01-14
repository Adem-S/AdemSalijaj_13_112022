import React from "react";
import { Link } from "react-router-dom";
import argentBankLogo from "../../Assets/argentBankLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Features/Auth/auth";

/**
 * Component for showing Header
 *
 * @component
 */
const Header = () => {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {user && (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i> {user.firstName}
            </Link>
            <Link
              className="main-nav-item"
              to="/"
              onClick={() => {
                dispatch(logout());
              }}
            >
              <i className="fa fa-sign-out"></i>
              {" Sign Out"}
            </Link>
          </>
        )}
        {!user && (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            {" Sign In"}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
