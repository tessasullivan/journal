import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavBar = ({ authUser, removeAuthUser }) => {
  return (
    <nav className="topbar topbar-inverse topbar-expand-md topbar-sticky">
      <div className="container">
        <div className="topbar-left">
          <button className="topbar-toggler">☰</button>
          <Link className="topbar-brand" to="/">
            <img
              className="logo-default"
              src={`${process.env.PUBLIC_URL}/assets/img/home-logo.png`}
              alt="logo"
            />
            <img
              className="logo-inverse"
              src={`${process.env.PUBLIC_URL}/assets/img/home-logo-light.png`}
              alt="logo"
            />
          </Link>
        </div>
        <div className="topbar-right">
          <ul className="topbar-nav nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/articles/create">
                Write new article
              </Link>
            </li>
            {/* If user is authenticated, show the my articles & logout options */}
            {authUser && (
              <li className="nav-item">
                {/* eslint-disable-next-line  */}
                <a className="nav-link" href="#">
                  Hey {authUser && authUser.user.name}!
                  <i className="fa fa-caret-down" />
                </a>
                <div className="nav-submenu">
                  <a className="nav-link" href="page-login.html">
                    My articles
                  </a>
                  <Link className="nav-link" to="/" onClick={removeAuthUser}>
                  Logout
                </Link>
                </div>
              </li>
            )}
            {/* If a user is authenticated, hide the login and register options */}
            {!authUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {!authUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
NavBar.propTypes = {
  authUser: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }),
  removeAuthUser: PropTypes.func.isRequired
};

NavBar.defaultProps = {
  authUser: null,
};
export default NavBar;
