import axiosService from "../../services/AxiosService";
import { extractApiErrors } from "./index";
const { fbAxios } = axiosService;

export function loadUsers() {
  return function (dispatch) {
    dispatch({ type: "REQUEST_DATA", resource: "users" });
    return fbAxios
      .get("/users")
      .then((res) => {
        const users = res.data;
        dispatch({ type: "REQUEST_DATA_COMPLETE", resource: "users" });
        dispatch({ type: "LOAD_USERS_SUCCESS", users });
      })
      .catch((error) => Promise.reject(extractApiErrors(error.response || [])));
  };
}

export function loadUserById(userId) {
  return function (dispatch) {
    dispatch({ type: "REQUEST_DATA", resource: "user" });
    return fbAxios
      .get(`/users/${userId}`)
      .then((res) => res.data)
      .then((user) => {
        dispatch({ type: "REQUEST_DATA_COMPLETE", resource: "user" });
        dispatch({
          type: "LOAD_USER_BY_ID_SUCCESS",
          user,
        });
      })
      .catch((error) => Promise.reject(extractApiErrors(error.response || [])));
  };
}

export const deleteUser = () => (dispatch) => {
  return fbAxios
    .delete(`/users/remove-account`)
    .then((res) => res.data)
    .then(({ id }) => {
      dispatch({
        type: "DELETE_RESOURCE",
        id,
        resource: "manage-user",
      });
    })
    .catch((error) => {
      dispatch({
        type: "REQUEST_ERROR",
        errors: extractApiErrors(error.response || []),
        resource: "manage-user",
      });
    });
};
