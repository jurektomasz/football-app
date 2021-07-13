import React from "react";
import GamesList from "components/games/List/GamesList";

function User({ username }) {
  return (
    <>
      <div className="user-profile">
        <div className="user-profile__info">
          <img
            src="img/football-player.png"
            alt="..."
            className="user-profile__img"
          ></img>

          <div className="user-profile__username">{username}</div>
        </div>

        <div className="user-profile__menu">
          <button type="button" className="btn btn--secondary">
            Hosting
          </button>
          <button type="button" className="btn btn--secondary">
            Participating
          </button>
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <GamesList />
      </div>
    </>
  );
}

export default User;
