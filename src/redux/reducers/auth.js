import { combineReducers } from "redux";

const initAuthReducer = () => {
  const isAuth = (state = false, action) => {
    switch (action.type) {
      case "USER_AUTHENTICATED":
        return true;
      case "USER_SIGNED_OUT":
        return false;
      default:
        return state;
    }
  };

  const username = (state = "", action) => {
    switch (action.type) {
      case "USER_AUTHENTICATED":
        return action.username;
      case "USER_SIGNED_OUT":
        return "";
      default:
        return state;
    }
  };
  const id = (state = "", action) => {
    switch (action.type) {
      case "USER_AUTHENTICATED":
        return action.id;
      case "USER_SIGNED_OUT":
        return "";
      default:
        return state;
    }
  };

  return combineReducers({
    isAuth,
    username,
    id,
  });
};

const auth = initAuthReducer();
export default auth;
