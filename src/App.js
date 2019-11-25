import React from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import WelcomeScreen from "./components/landingpage/WelcomeScreen";
import Home from "./components/homepage/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <WelcomeScreen />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
