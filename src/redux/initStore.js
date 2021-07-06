import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import {
  gamesReducer as games,
  gameByIdReducer as game,
} from "./reducers/games";
import {
  usersReducer as users,
  userByIdReducer as user,
} from "./reducers/users";
import manage from "./reducers/manage";
import thunk from "redux-thunk";
import auth from "./reducers/auth";

function initStore(initialValue) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const reducers = combineReducers({
    users,
    user,
    games,
    game,
    auth,
    manage,
  });

  return createStore(
    reducers,
    initialValue,
    composeEnhancers(applyMiddleware(thunk))
  );
}

export default initStore;
