import { combineReducers } from "redux";
import { isFetchingReducer } from "./common";

const initGamesReducer = () => {
  const allGames = (state = [], action) => {
    switch (action.type) {
      case "LOAD_GAMES_SUCCESS":
        return action.games;
      default:
        return state;
    }
  };
  const isFetching = isFetchingReducer("games");
  return combineReducers({
    allGames,
    isFetching,
  });
};
export const gamesReducer = initGamesReducer();

function initGameReducer() {
  function gameById(state = {}, action) {
    switch (action.type) {
      case "UNMOUNT_GAME":
        return {};
      case "UPDATED_GAME_SUCCESS":
      case "LOAD_GAME_BY_ID_SUCCESS":
      case "JOINED":
      case "LEAVED":
        return action.game;
      default:
        return state;
    }
  }

  const isFetching = isFetchingReducer("game");

  return combineReducers({
    gameById,
    isFetching,
  });
}

export const gameByIdReducer = initGameReducer();
