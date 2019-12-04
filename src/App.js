import React, { useContext } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import WelcomeScreen from "./components/landingpage/WelcomeScreen";
import Home from "./components/homepage/Home";
import { AuthProvider } from "./context/AuthContext";

import { DarkModeContext, DarkModeProvider } from "./context/DarkModeContext";
import { ProjectProvider } from "./context/ProjectContext";
import { muithemeLight, muithemeDark } from "./Theme";
import { TodoGroupContextProvider } from "./context/TodoGroupContext";

function App(props) {
  const { isDarkMode } = useContext(DarkModeContext);
  console.log({ isDarkMode });
  return (
    <MuiThemeProvider theme={isDarkMode ? muithemeLight : muithemeDark}>
      <TodoGroupContextProvider>
        <AuthProvider>
          <ProjectProvider>
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
          </ProjectProvider>
        </AuthProvider>
      </TodoGroupContextProvider>
    </MuiThemeProvider>
  );
}

export default App;
