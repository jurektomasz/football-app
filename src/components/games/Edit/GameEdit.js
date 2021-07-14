import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import withUserCheck from "./withUserCheck";
import { loadGameById, updateGame } from "redux/actions";
import EditableInput from "./EditableInput";
import Spinner from "components/spinner/Spinner";

const GameEdit = ({ match, dispatch, game }) => {
  const { _id } = match.params;
  const history = useHistory();

  useEffect(() => {
    dispatch(loadGameById(_id));
  }, [dispatch, _id]);

  const saveChanges = (gameData, onSuccess, onError) => {
    dispatch(updateGame(_id, gameData))
      .then(() => onSuccess())
      .catch((errors) => {
        alert(errors[0].detail);
        onError();
      });
  };

  return game.isFetching || !game._id ? (
    <Spinner />
  ) : (
    <div className="game-detail">
      <div className="info">
        <div className="info__heading">
          <button className="btn" onClick={() => history.goBack()}>
            <FontAwesomeIcon icon="arrow-left" className="info__back-arrow" />
          </button>
          <div className="info__host">
            <div className="info__host-desc">
              <div className="info__host-name">{game.host.username}</div>
              <div className="info__host-tag">Organizer</div>
            </div>
            <img
              src={game.host.image}
              alt="{host.image}"
              className="card-heading__participants-image info__host-img"
            />
          </div>
        </div>
        <div className="info__description">
          <div className="card-heading__location">
            <EditableInput
              type="text"
              entity={game}
              field={"place"}
              onUpdate={saveChanges}
            />
            <EditableInput
              type="text"
              entity={game}
              field={"city"}
              onUpdate={saveChanges}
            />
          </div>
          <div className="info__description-text edit__desc">
            <EditableInput
              type="text"
              entity={game}
              field={"description"}
              onUpdate={saveChanges}
            />
          </div>
          <div className="card-tags edit__tags">
            <div className="tag tag__time">
              <FontAwesomeIcon icon="clock" className="tag__icon" />
              <span className="tag__description edit__tag">
                <EditableInput
                  type="time"
                  entity={game}
                  field={"time"}
                  onUpdate={saveChanges}
                />
              </span>
            </div>
            <div className="tag tag__date">
              <FontAwesomeIcon icon="calendar-alt" className="tag__icon" />
              <span className="tag__description edit__tag">
                <EditableInput
                  type="date"
                  entity={game}
                  field={"date"}
                  onUpdate={saveChanges}
                />
              </span>
            </div>
            <div className="tag tag__max-participants">
              <FontAwesomeIcon icon="user" className="tag__icon" />
              <span className="tag__description edit__tag">
                <EditableInput
                  type="number"
                  entity={game}
                  field={"maxParticipants"}
                  onUpdate={saveChanges}
                />
              </span>
            </div>
            <div className="tag tag__price">
              <FontAwesomeIcon icon="pound-sign" className="tag__icon" />
              <span className="tag__description edit__tag">
                <EditableInput
                  type="number"
                  entity={game}
                  field={"price"}
                  onUpdate={saveChanges}
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "4rem" }}></div>
    </div>
  );
};

GameEdit.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = ({ game }) => {
  return {
    game: game.gameById,
  };
};

const GameEditWithRouterAndCheck = withRouter(withUserCheck(GameEdit));

export default connect(mapStateToProps)(GameEditWithRouterAndCheck);
