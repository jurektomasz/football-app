import React from "react";
import PropTypes from "prop-types";
import { joinGame, leaveGame } from "redux/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Participants = ({
  participants,
  maxParticipants,
  auth,
  id,
  dispatch,
}) => {
  const handleJoin = async () => {
    try {
      await dispatch(joinGame(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeave = async () => {
    try {
      await dispatch(leaveGame(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="game-detail__participants">
      <div className="game-detail__participants-tag">
        <span>Participants </span>
        <span className="game-detail__participants-number">
          {`(${participants.length}/${maxParticipants})`}
        </span>
      </div>

      <div className="game-detail__participants-img">
        {participants.map((participant) => {
          return (
            <img
              data-toggle="tooltip"
              data-placement="top"
              title={participant.username}
              key={participant._id}
              src={participant.image}
              alt=" "
              className="card-heading__participants-image info__host-img"
            />
          );
        })}
      </div>

      <div className="game-detail__participants-join">
        {!participants.some((user) => user._id === auth.id) && (
          <button
            className={
              participants.length < maxParticipants
                ? "btn btn-primary btn-primary--small"
                : "btn btn-primary btn-primary--small btn-primary--disabled"
            }
            onClick={handleJoin}
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Join
          </button>
        )}
        {participants.some((user) => user._id === auth.id) && (
          <button
            className={"btn btn-primary btn-primary--small"}
            onClick={handleLeave}
          >
            <FontAwesomeIcon icon="minus" />
            &nbsp; Leave
          </button>
        )}
      </div>
    </div>
  );
};

Participants.propTypes = {
  participants: PropTypes.array.isRequired,
  maxParticipants: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Participants;
