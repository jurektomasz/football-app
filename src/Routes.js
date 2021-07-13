import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import AuthRoute from "./components/auth/AuthRoute";
import GuestRoute from "./components/auth/GuestRoute";

import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Landing from "./components/landing/Landing";
import GamesListSearch from "./components/games/Search/GamesListSearch";
import GameDetail from "./components/games/Detail/GameDetail";
import CreateGame from "./components/games/Create/CreateGame";
import Hosting from "./components/user/hosting/Hosting";
import Participating from "./components/user/participating/Participating";
import NotFound from "components/404/NotFound";
import GameEdit from "./components/games/Edit/GameEdit";

const Routes = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <GuestRoute path="/login">
          <Login />
        </GuestRoute>
        <GuestRoute path="/register">
          <Register />
        </GuestRoute>

        <AuthRoute path="/game/create">
          <CreateGame />
        </AuthRoute>
        <AuthRoute path="/games/search/:location">
          <GamesListSearch />
        </AuthRoute>
        <AuthRoute exact path="/games/:_id">
          <GameDetail />
        </AuthRoute>
        <AuthRoute exact path="/games/:_id/edit">
          <GameEdit />
        </AuthRoute>

        <AuthRoute path="/user/hosting">
          <Hosting />
        </AuthRoute>
        <AuthRoute path="/user/participating">
          <Participating />
        </AuthRoute>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ auth: isAuth }) => ({
  isAuth: isAuth,
});

export default connect(mapStateToProps)(Routes);
