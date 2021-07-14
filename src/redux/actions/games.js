import axiosService from "../../services/AxiosService";
import { extractApiErrors } from "./index";
const { fbAxios } = axiosService;

export const verifyGameHost = (gameId) => {
  return fbAxios.get(`/games/${gameId}/verify-host`);
};

export const loadGames = (location) => (dispatch) => {
  const query = location ? `/games?city=${location}` : "/games";
  dispatch({ type: "REQUEST_DATA", resource: "games" });
  fbAxios.get(query).then((res) => {
    const games = res.data;
    dispatch({ type: "REQUEST_DATA_COMPLETE", resource: "games" });
    dispatch({ type: "LOAD_GAMES_SUCCESS", games });
  });
};
export const loadHosting = () => (dispatch) => {
  dispatch({ type: "REQUEST_DATA", resource: "manage-games" });
  return fbAxios
    .get("/games/hosting")
    .then((res) => res.data)
    .then((games) => {
      dispatch({
        type: "REQUEST_DATA_COMPLETE",
        data: games,
        resource: "manage-games",
      });
    })
    .catch((error) => {
      dispatch({
        type: "REQUEST_ERROR",
        errors: extractApiErrors(error.response || []),
        resource: "manage-games",
      });
    });
};

export function loadParticipating() {
  return function (dispatch) {
    dispatch({ type: "REQUEST_DATA", resource: "manage-games" });
    return fbAxios
      .get("/games/participating")
      .then((res) => res.data)
      .then((games) => {
        dispatch({
          type: "REQUEST_DATA_COMPLETE",
          data: games,
          resource: "manage-games",
        });
      })
      .catch((error) => {
        dispatch({
          type: "REQUEST_ERROR",
          errors: extractApiErrors(error.response || []),
          resource: "manage-games",
        });
      });
  };
}

export const loadGameById = (id) => async (dispatch) => {
  dispatch({ type: "REQUEST_DATA", resource: "game" });
  const res = await fbAxios.get(`/games/${id}`);
  dispatch({ type: "REQUEST_DATA_COMPLETE", resource: "game" });
  const game = await res.data;
  dispatch({
    type: "LOAD_GAME_BY_ID_SUCCESS",
    game,
  });
};

export function createGame(newGame) {
  return fbAxios.post("/games/create-game", newGame).catch((error) => {
    return Promise.reject(extractApiErrors(error.response || []));
  });
}

export const updateGame = (id, gameData) => (dispatch) => {
  return fbAxios
    .patch(`/games/${id}`, gameData)
    .then((res) => res.data)
    .then((updatedGame) => {
      return dispatch({ type: "UPDATED_GAME_SUCCESS", game: updatedGame });
    })
    .catch((error) => {
      return Promise.reject(extractApiErrors(error.response || []));
    });
};

export const joinGame = (id) => (dispatch) => {
  return fbAxios
    .patch(`/games/${id}/join-game`)
    .then((res) => res.data)
    .then((updatedGame) =>
      dispatch({
        type: "JOINED",
        game: updatedGame,
      })
    )
    .catch((error) => {
      return Promise.reject(extractApiErrors(error.response || []));
    });
};
export const leaveGame = (id) => (dispatch) => {
  return fbAxios
    .patch(`/games/${id}/leave-game`)
    .then((res) => res.data)
    .then((updatedGame) =>
      dispatch({
        type: "LEAVED",
        game: updatedGame,
      })
    )
    .catch((error) => {
      return Promise.reject(extractApiErrors(error.response || []));
    });
};
export const deleteGame = (gameId) => (dispatch) => {
  return fbAxios
    .delete(`/games/${gameId}`)
    .then((res) => res.data)
    .then(({ id }) => {
      dispatch({
        type: "DELETE_RESOURCE",
        id,
        resource: "manage-games",
      });
    })
    .catch((error) => {
      dispatch({
        type: "REQUEST_ERROR",
        errors: extractApiErrors(error.response || []),
        resource: "manage-games",
      });
    });
};
