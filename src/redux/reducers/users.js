import { combineReducers } from "redux";
import { isFetchingReducer } from "./common";

const initUsersReducer = () => {
  const users = (state = [], action) => {
    switch (action.type) {
      case "LOAD_USERS_SUCCESS":
        return action.users;
      default:
        return state;
    }
  };

  const isFetching = isFetchingReducer("users");

  return combineReducers({
    users,
    isFetching,
  });
};

export const usersReducer = initUsersReducer();

const initUserReducer = () => {
  const userById = (state = {}, action) => {
    switch (action.type) {
      case "LOAD_USER_BY_ID_SUCCESS":
        return action.user;
      default:
        return state;
    }
  };

  const isFetching = isFetchingReducer("user");

  return combineReducers({
    userById,
    isFetching,
  });
};

export const userByIdReducer = initUserReducer();
