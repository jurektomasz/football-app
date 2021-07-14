import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { loadHosting, deleteGame } from "redux/actions";
import { loadUsers } from "redux/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "components/spinner/Spinner";
import { renderGames } from "components/helpers/renderGames";

const Hosting = ({ dispatch, games, isFetching }) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    dispatch(loadUsers());
    dispatch(loadHosting());
  }, [dispatch]);

  function handleDelete(id) {
    const canDelete = askForPermission();
    if (!canDelete) {
      return;
    }
    dispatch(deleteGame(id))
      .then(() => setMessage("Successfully deleted!"))
      .catch(() => setMessage("Something went wrong. Try again later."));
  }

  function askForPermission() {
    return window.confirm("Are you sure you want to delete this game?");
  }

  const renderMenu = (game) => (
    <div className="d-flex w-50 justify-content-around mb-3">
      <Link
        to={{ pathname: `/games/${game._id}/edit` }}
        className="btn btn-success btn-sm"
      >
        Update
      </Link>
      <button
        onClick={() => handleDelete(game._id)}
        className="btn btn-sm btn-danger"
      >
        Delete
      </button>
    </div>
  );

  return isFetching ? (
    <Spinner />
  ) : (
    <div className="card-list">
      <h1 className="page-title">games you are hosting</h1>
      {message && <div className="alert alert-success">{message}</div>}
      <div className="row">{renderGames(games, renderMenu)}</div>
    </div>
  );
};

Hosting.propTypes = {
  dispatch: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    games: state.manage.games.items,
    isFetching: state.manage.games.isFetching,
  };
};

export default connect(mapStateToProps)(Hosting);
