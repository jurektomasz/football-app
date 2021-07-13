import React from "react";
import GameCard from "components/games/Card/GameCard";

export const renderGames = (games, renderMenu = () => {}) => {
  return games.map((game) => {
    return (
      <div key={game._id} className="col-lg-6">
        <GameCard {...game} renderMenu={() => renderMenu(game)} />
      </div>
    );
  });
};
