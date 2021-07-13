import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { capitalize } from "components/helpers";
import GameCardTags from "./GameCardTags";

const GameCard = ({
  _id,
  host,
  participants,
  city,
  description,
  price,
  time,
  date,
  maxParticipants,
  renderMenu,
}) => {
  return (
    <div className="game-card">
      <Link to={`/games/${_id}`} className="game-card__link">
        <div className="card-heading">
          <div className="card-heading__participants">
            <div className="card-heading__participants--host">
              <img
                alt="Host Name"
                data-toggle="tooltip"
                title={host.username}
                className="card-heading__participants-image"
                src={host === undefined ? "./img/football.png" : host.image}
              />
            </div>
            <div className="card-heading__participants--rest">
              +{participants.length === 0 ? 0 : participants.length - 1}
            </div>
          </div>
          <div className="card-heading__location">{capitalize(city)}</div>
          {}
        </div>
        <div className="card-description">{description}</div>
        <GameCardTags
          price={price}
          time={time}
          date={date}
          maxParticipants={maxParticipants}
          card={true}
        />
      </Link>
      {renderMenu && renderMenu()}
    </div>
  );
};

GameCard.propTypes = {
  _id: PropTypes.string.isRequired,
  host: PropTypes.object.isRequired,
  participants: PropTypes.array.isRequired,
  city: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  maxParticipants: PropTypes.number.isRequired,
  renderMenu: PropTypes.func,
};

export default GameCard;
