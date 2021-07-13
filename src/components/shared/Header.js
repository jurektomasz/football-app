/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import HeaderNavIn from "./HeaderNavIn";
import HeaderNavOut from "./HeaderNavOut";

const Header = ({ username, isAuth, logout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <Link className="navbar-brand logo" to="/">
        FOOTLY
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {isAuth && <HeaderNavIn logout={logout} username={username} />}
        {!isAuth && <HeaderNavOut />}
      </div>
    </nav>
  );
};

Header.propTypes = {
  username: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth: { username, isAuth } }) => {
  return {
    username,
    isAuth,
  };
};

export default connect(mapStateToProps)(Header);
