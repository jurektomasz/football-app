import axiosService from "../../services/AxiosService";
import { extractApiErrors } from "./index";
const { fbAxios } = axiosService;

export function registerUser(registerData) {
  return fbAxios
    .post("http://localhost:3000/api/v1/users/register", registerData)
    .catch((error) => {
      return Promise.reject(extractApiErrors(error.response || []));
    });
}

export function loginUser(loginData) {
  return fbAxios
    .post("http://localhost:3000/api/v1/users/login", loginData)
    .then((res) => res.data)
    .catch((error) => {
      return Promise.reject(extractApiErrors(error.response || []));
    });
}

export function userAuthenticated(decodedToken) {
  return {
    type: "USER_AUTHENTICATED",
    username: decodedToken.username || "",
    id: decodedToken.sub || "",
  };
}
