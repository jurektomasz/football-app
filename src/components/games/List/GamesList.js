import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadGames } from "redux/actions";
import { renderGames } from "../../helpers/renderGames";
import Spinner from "components/spinner/Spinner";
import { useLocation } from "react-router-dom";

const GamesList = ({ games, isFetching, dispatch }) => {
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  const location = useLocation();
  const { message } = location.state || "";

  if (isFetching) return <Spinner />;

  return (
    <div className="card-list">
      {message && <div className="alert alert-success">{message}</div>}
      <div className="row">{renderGames(games)}</div>
    </div>
  );
};

GamesList.propTypes = {
  games: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ games }) => {
  return {
    games: games.allGames,
    isFetching: games.isFetching,
  };
};

export default connect(mapStateToProps)(GamesList);
