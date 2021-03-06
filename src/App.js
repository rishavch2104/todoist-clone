import React, { useContext } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import WelcomeScreen from "./components/landingpage/WelcomeScreen";
import Home from "./components/homepage/Home";
import { AuthProvider } from "./context/AuthContext";
import { DarkModeContext } from "./context/DarkModeContext";
import { ProjectProvider } from "./context/ProjectContext";
import { TodoGroupContextProvider } from "./context/TodoGroupContext";
import { muithemeLight, muithemeDark } from "./Theme";

function App(props) {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <MuiThemeProvider theme={isDarkMode ? muithemeDark : muithemeLight}>
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
