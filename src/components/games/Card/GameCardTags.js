import React from "react";
import { displayDate } from "components/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GameCardTags = ({ price, time, date, maxParticipants, card }) => {
  return (
    <div className="card-tags">
      <div className="tag tag__time">
        <FontAwesomeIcon icon="clock" className="tag__icon" />
        <span className="tag__description">{time}</span>
      </div>
      <div className="tag tag__date">
        <FontAwesomeIcon icon="calendar-alt" className="tag__icon" />
        <span className="tag__description">{displayDate(date)}</span>
      </div>
      {card && (
        <div className="tag tag__max-participants">
          <FontAwesomeIcon icon="user" className="tag__icon" />
          <span className="tag__description">{maxParticipants}</span>
        </div>
      )}
      <div className="tag tag__price">
        <FontAwesomeIcon icon="pound-sign" className="tag__icon" />
        <span className="tag__description">
          {price === 0 ? "free" : "£" + price}
        </span>
      </div>
    </div>
  );
};

export default GameCardTags;
