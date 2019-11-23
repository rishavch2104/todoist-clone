import React from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";
import Home from "./components/Home";
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
