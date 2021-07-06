import { combineReducers } from "redux";
import { createList } from "./common";

const initManageReducer = () => {
  return combineReducers({
    games: createList("manage-games"),
    users: createList("manage-users"),
  });
};

const manage = initManageReducer();
export default manage;
