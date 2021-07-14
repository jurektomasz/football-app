import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { loadGameById } from "redux/actions";
import TomMap from "components/map/TomMap";
import Participants from "./Participants";
import Spinner from "components/spinner/Spinner";
import { capitalize } from "components/helpers";
import GameCardTags from "components/games/Card/GameCardTags";

const GameDetail = ({ game, auth, dispatch, match }) => {
  const { _id } = match.params;
  const history = useHistory();

  useEffect(() => {
    dispatch(loadGameById(_id));

    return () => {
      dispatch({ type: "UNMOUNT_GAME" });
    };
  }, [_id, dispatch]);

  const handleBackClick = () => {
    history.goBack();
  };

  const location = () => {
    const {
      gameById: { place, city },
    } = game;
    return place && city && place + ", " + city;
  };

  return game.isFetching || !game.gameById._id ? (
    <Spinner />
  ) : (
    <div className="game-detail">
      <div className="info">
        <div className="info__heading">
          <button className="btn" onClick={handleBackClick}>
            <FontAwesomeIcon icon="arrow-left" className="info__back-arrow" />
          </button>
          <div className="info__host">
            <div className="info__host-desc">
              <div className="info__host-name">
                {capitalize(game.gameById.host.username)}
              </div>
              <div className="info__host-tag">Host</div>
            </div>
            <img
              src={game.gameById.host.image}
              alt="{host.image}"
              className="card-heading__participants-image info__host-img"
            />
          </div>
        </div>
        <div className="info__description">
          <div className="card-heading__location">
            {`${capitalize(game.gameById.place)}, ${capitalize(
              game.gameById.city
            )}`}
          </div>
          <div className="info__description-text">
            {game.gameById.description}
          </div>
          <GameCardTags
            price={game.gameById.price}
            time={game.gameById.time}
            date={game.gameById.date}
            maxParticipants={game.gameById.maxParticipants}
            card={false}
          />
        </div>
      </div>
      <Participants
        participants={game.gameById.participants}
        maxParticipants={game.gameById.maxParticipants}
        auth={auth}
        dispatch={dispatch}
        id={_id}
      />

      <div className="mt-5">
        <TomMap location={location()} />
      </div>
      <div style={{ height: "4rem" }}></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    game: state.game,
    auth: state.auth,
  };
};

const GameDetailWithRouter = withRouter(GameDetail);

export default connect(mapStateToProps)(GameDetailWithRouter);
