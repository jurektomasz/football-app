import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { capitalize } from "components/helpers";

import { loadGames } from "redux/actions";
import { renderGames } from "components/helpers/renderGames";

function GamesListSearch({ match, dispatch, games }) {
  const { location } = match.params;

  useEffect(() => {
    dispatch(loadGames(location));
  }, [location, dispatch]);

  return (
    <div className="card-list">
      <h1 className="page-title">Games in {capitalize(location)}</h1>
      <div className="row">{renderGames(games)}</div>
    </div>
  );
}

GamesListSearch.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    games: state.games.allGames,
  };
};

export default connect(mapStateToProps)(withRouter(GamesListSearch));
