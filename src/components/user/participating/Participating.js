import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { loadParticipating } from "redux/actions";
import { loadUsers } from "redux/actions";
import { connect } from "react-redux";
import Spinner from "components/spinner/Spinner";
import { renderGames } from "components/helpers/renderGames";

const Participating = ({ dispatch, users, participating, isFetching }) => {
  useEffect(() => {
    dispatch(loadUsers());
    dispatch(loadParticipating());
  }, [dispatch]);

  return isFetching ? (
    <Spinner />
  ) : (
    <div className="card-list">
      <h1 className="page-title">games you are taking part</h1>
      <div className="row">{renderGames(participating)}</div>
    </div>
  );
};

Participating.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  participating: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    participating: state.manage.games.items,
    isFetching: state.manage.games.isFetching,
  };
};

export default connect(mapStateToProps)(Participating);
