import React, { useEffect } from "react";

import Header from "./components/shared/Header";
import Routes from "./Routes";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { AuthProvider, useAuth } from "./providers/AuthProvider";
import { MapProvider } from "./providers/MapProvider";

import initStore from "./redux/initStore";

const store = initStore();

const Providers = ({ children }) => (
  <Provider store={store}>
    <AuthProvider>
      <MapProvider apiKey="pA9zrqHAOC33Gqtl73Wx4MuuyzUXgZPj">
        {children}
      </MapProvider>
    </AuthProvider>
  </Provider>
);

const FBApp = () => {
  const authService = useAuth();

  useEffect(() => {
    authService.checkAuthState();
  }, [authService]);

  return (
    <Router>
      <div className="landing">
        <Header logout={authService.signOut} />
        <Routes />
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <Providers>
      <FBApp />
    </Providers>
  );
};

export default App;
