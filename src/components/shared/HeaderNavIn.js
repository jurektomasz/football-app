import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import GamesSearchInput from "components/games/Search/GamesSearchInput";
import { capitalize } from "components/helpers";

const HeaderNavIn = ({ logout, username }) => {
  return (
    <ul className="navbar-nav nav w-100">
      <GamesSearchInput />
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="/"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {capitalize(username)}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/game/create">
            New Game
          </Link>
          <Link className="dropdown-item" to="/user/hosting">
            My Hostings
          </Link>
          <Link className="dropdown-item" to="/user/participating">
            Participating
          </Link>

          <button onClick={logout} className="dropdown-item">
            Logout
          </button>
        </div>
      </li>
      <li className="nav-item"></li>
    </ul>
  );
};

HeaderNavIn.propTypes = {
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default HeaderNavIn;
