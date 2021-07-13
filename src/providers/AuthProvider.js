import React, { createContext, useContext } from "react";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import moment from "moment";

import { loginUser, userAuthenticated } from "../redux/actions";

const AuthContext = createContext(null);

function AuthBaseProvider({ children, dispatch }) {
  const checkAuthState = () => {
    const decodedToken = decodeToken(getToken());
    if (decodedToken && moment().isBefore(getExpiration(decodedToken))) {
      dispatch(userAuthenticated(decodedToken));
    }
  };

  const isAuthenticated = () => {
    const token = getToken();
    if (!token) {
      return false;
    }
    const decodedToken = decodeToken(token);
    return isTokenValid(decodedToken);
  };

  const isTokenValid = (decodedToken) => {
    return decodedToken && moment().isBefore(getExpiration(decodedToken));
  };

  const getExpiration = (decodedToken) => {
    return moment.unix(decodedToken.exp);
  };

  const getToken = () => {
    return localStorage.getItem("app_token");
  };

  const decodeToken = (token) => {
    return jwt.decode(token);
  };

  const signIn = (loginData) => {
    return loginUser(loginData).then((token) => {
      localStorage.setItem("app_token", token);
      const decodedToken = decodeToken(token);
      dispatch(userAuthenticated(decodedToken));
      return token;
    });
  };

  const signOut = () => {
    localStorage.removeItem("app_token");
    dispatch({ type: "USER_SIGNED_OUT" });
  };

  const authApi = {
    signIn,
    checkAuthState,
    signOut,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={authApi}>{children}</AuthContext.Provider>
  );
}

export const AuthProvider = connect()(AuthBaseProvider);

export const useAuth = () => {
  return useContext(AuthContext);
};

export function withAuth(Component) {
  return function (props) {
    return (
      <AuthContext.Consumer>
        {(authApi) => <Component {...props} auth={authApi} />}
      </AuthContext.Consumer>
    );
  };
}
