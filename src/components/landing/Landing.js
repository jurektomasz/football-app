import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import GamesList from "components/games/List/GamesList";
import Welcome from "components/welcome/Welcome";

const Landing = ({ isAuth }) => {
  return isAuth ? <GamesList /> : <Welcome />;
};

Landing.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ auth: { isAuth } }) => ({
  isAuth: isAuth,
});

export default connect(mapStateToProps)(Landing);
